import { create } from "zustand";
interface S {
  p: number; n: number; e: number; cloud: boolean; exploded: boolean; paused: boolean; bloom: boolean;
  set: (patch: Partial<S>) => void; bump: (k: "p" | "n" | "e", d: number) => void;
}
export const useSim = create<S>((set) => ({
  p: 1, n: 0, e: 1, cloud: false, exploded: false, paused: false, bloom: true,
  set: (patch) => set(patch),
  bump: (k, d) => set((s) => ({ [k]: Math.min(k === "p" ? 30 : 40, Math.max(0, s[k] + d)) } as Partial<S>)),
}));
