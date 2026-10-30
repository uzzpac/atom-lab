import { describe, it, expect } from "vitest";
import { atomInfo, shells } from "./atom";
describe("atomInfo", () => {
  it("عدد اتمی، جرمی و بار", () => { const i = atomInfo(6, 8, 6); expect([i.Z, i.A, i.charge]).toEqual([6, 14, 0]); });
  it("Na⁺", () => { const i = atomInfo(11, 12, 10); expect(i.charge).toBe(1); expect(i.kind).toBe("cation"); expect(i.element?.symbol).toBe("Na"); });
  it("Cl⁻", () => { const i = atomInfo(17, 18, 18); expect(i.charge).toBe(-1); expect(i.kind).toBe("anion"); });
  it("عنصر فقط با پروتون", () => { expect(atomInfo(8, 0, 3).element?.symbol).toBe("O"); expect(atomInfo(8, 20, 8).element?.symbol).toBe("O"); });
  it("بدون داده، پایداری null", () => { expect(atomInfo(8, 3, 8).stable).toBeNull(); expect(atomInfo(6, 8, 6).stable).toBe(false); });
});
describe("shells", () => {
  it("سدیم، کلر، مس", () => { expect(shells(11)).toEqual([2, 8, 1]); expect(shells(17)).toEqual([2, 8, 7]); expect(shells(29, 29)).toEqual([2, 8, 18, 1]); });
  it("یون‌ها", () => { expect(shells(10)).toEqual([2, 8]); expect(shells(18)).toEqual([2, 8, 8]); });
});
