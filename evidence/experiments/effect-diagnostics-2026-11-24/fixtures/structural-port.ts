import type * as Effect from "effect/Effect";

export type EffectVersionAnchor = Effect.Effect<void>;

/** @stability stable */
export interface StablePort {
  readonly read: (key: string) => Promise<string>;
}
