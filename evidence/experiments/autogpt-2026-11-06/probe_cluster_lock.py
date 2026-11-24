"""Deterministically inspect renewal using the unchanged upstream class AST.

No AutoGPT dependency is imported, no service is started, and no network is used.
The fake Redis schedules an owner change between GET and EXPIRE. This tests only
the isolated renewal algorithm, not a complete Redis deployment or executor.
"""

from __future__ import annotations

import argparse
import ast
import hashlib
import json
import pathlib
import subprocess
import threading
import time


class ControlledRedis:
    def __init__(self, owner: str, successor_after_get: str | None = None):
        self.owner = owner
        self.ttl = 11
        self.successor_after_get = successor_after_get
        self.trace: list[dict[str, object]] = []

    def get(self, key: str) -> str:
        reply = self.owner
        self.trace.append({"command": "GET", "key": key, "reply": reply})
        if self.successor_after_get is not None:
            self.owner = self.successor_after_get
            self.successor_after_get = None
            self.trace.append(
                {"event": "owner_changes_before_next_command", "new_owner": self.owner}
            )
        return reply

    def expire(self, key: str, timeout: int) -> bool:
        self.ttl = timeout
        self.trace.append(
            {"command": "EXPIRE", "key": key, "owner_now": self.owner, "ttl": timeout}
        )
        return True


def run_case(lock_class: type, owner: str, successor: str | None = None) -> dict:
    redis = ControlledRedis(owner, successor)
    lock = lock_class(redis, "probe-lock", "worker-a", timeout=300)
    result = lock._refresh()
    return {
        "refresh_returned": result,
        "lock_requesting_owner": lock.owner_id,
        "stored_owner_after": redis.owner,
        "ttl_after": redis.ttl,
        "trace": redis.trace,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("repository", type=pathlib.Path)
    parser.add_argument("--output", type=pathlib.Path)
    args = parser.parse_args()
    relative = "autogpt_platform/backend/backend/executor/cluster_lock.py"
    source_path = args.repository / relative
    source_bytes = source_path.read_bytes()
    tree = ast.parse(source_bytes, filename=str(source_path))
    class_node = next(
        node
        for node in tree.body
        if isinstance(node, ast.ClassDef) and node.name == "ClusterLock"
    )
    # The AST of the upstream class is compiled unchanged. Only the globals
    # exercised by __init__ and _refresh's non-exception path are supplied.
    # An unexpected exception will fail this probe rather than be disguised.
    namespace = {"threading": threading, "time": time}
    exec(
        compile(ast.Module(body=[class_node], type_ignores=[]), str(source_path), "exec"),
        namespace,
    )
    lock_class = namespace["ClusterLock"]
    stable = run_case(lock_class, "worker-a")
    lost_before_get = run_case(lock_class, "worker-b")
    lost_after_get = run_case(lock_class, "worker-a", "worker-b")

    assert stable["refresh_returned"] is True
    assert stable["stored_owner_after"] == "worker-a"
    assert stable["ttl_after"] == 300
    assert lost_before_get["refresh_returned"] is False
    assert lost_before_get["ttl_after"] == 11
    assert lost_after_get["refresh_returned"] is True
    assert lost_after_get["stored_owner_after"] == "worker-b"
    assert lost_after_get["ttl_after"] == 300

    result = {
        "test_kind": "isolated unchanged upstream class AST with deterministic fake Redis",
        "not_tested": ["real Redis", "network", "full executor", "deployment capacity"],
        "source_path": relative,
        "source_commit": subprocess.check_output(
            ["git", "-C", str(args.repository), "rev-parse", "HEAD"], text=True
        ).strip(),
        "source_sha256": hashlib.sha256(source_bytes).hexdigest(),
        "source_blob_sha": subprocess.check_output(
            ["git", "-C", str(args.repository), "hash-object", relative], text=True
        ).strip(),
        "stable_owner": stable,
        "owner_lost_before_get": lost_before_get,
        "owner_changes_after_get": lost_after_get,
        "observation": (
            "Renewal reports success and extends the successor's TTL when ownership "
            "changes after GET's observation and before EXPIRE."
        ),
    }
    output = json.dumps(result, indent=2) + "\n"
    if args.output:
        args.output.write_text(output)
    print(output, end="")


if __name__ == "__main__":
    main()
