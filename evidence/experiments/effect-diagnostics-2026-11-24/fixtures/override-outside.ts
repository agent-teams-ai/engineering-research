import { get, post } from "effect/http/HttpClient";

export const allowedGet = get("https://example.invalid");
export const rejectedPost = post("https://example.invalid");
