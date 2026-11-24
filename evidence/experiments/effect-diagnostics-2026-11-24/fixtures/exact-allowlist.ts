import { get as renamedGet, post } from "effect/http/HttpClient";
import * as HttpClient from "effect/http/HttpClient";

const localGet = renamedGet;
export const aliasedRequest = localGet("https://example.invalid");
export const namespacedRequest = HttpClient.get("https://example.invalid");
export const rejectedSibling = post("https://example.invalid");
