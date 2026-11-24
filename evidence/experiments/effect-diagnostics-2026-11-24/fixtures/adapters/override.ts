import { get, post } from "effect/http/HttpClient";

export const allowedPost = post("https://example.invalid");
export const rejectedGet = get("https://example.invalid");
