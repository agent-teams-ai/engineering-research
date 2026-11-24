import type { HttpClient } from "effect/http/HttpClient";

/** @stability stable */
export interface StableClientPort {
  readonly client: HttpClient;
}
