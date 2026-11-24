import { get as renamedGet } from "effect/http/HttpClient";

const localGet = renamedGet;
export const renamedRequest = renamedGet("https://example.invalid");
export const localRequest = localGet("https://example.invalid");
