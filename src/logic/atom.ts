// منطق علمی: کاملاً جدا از گرافیک و قابل تست
export const ELEMENTS = "H هیدروژن|He هلیم|Li لیتیوم|Be بریلیم|B بور|C کربن|N نیتروژن|O اکسیژن|F فلوئور|Ne نئون|Na سدیم|Mg منیزیم|Al آلومینیم|Si سیلیسیم|P فسفر|S گوگرد|Cl کلر|Ar آرگون|K پتاسیم|Ca کلسیم|Sc اسکاندیم|Ti تیتانیم|V وانادیم|Cr کروم|Mn منگنز|Fe آهن|Co کبالت|Ni نیکل|Cu مس|Zn روی"
  .split("|").map((s) => { const [symbol, name] = s.split(" "); return { symbol, name }; });

// فقط ایزوتوپ‌هایی که داده‌شان مطمئن است؛ برای بقیه ادعایی نمی‌کنیم
const STABILITY: Record<string, boolean> = {
  "1-1": true, "1-2": true, "2-4": true, "6-12": true, "6-13": true, "6-14": false,
  "8-16": true, "11-23": true, "17-35": true, "17-37": true, "29-63": true, "29-65": true,
};

export interface AtomInfo {
  Z: number; A: number; charge: number; element: { symbol: string; name: string } | null;
  neutral: boolean; kind: "neutral" | "cation" | "anion"; stable: boolean | null;
}
export function atomInfo(p: number, n: number, e: number): AtomInfo {
  const charge = p - e; // بار خالص = پروتون − الکترون
  return {
    Z: p, A: p + n, charge,
    element: p >= 1 && p <= ELEMENTS.length ? ELEMENTS[p - 1] : null, // عنصر فقط با پروتون
    neutral: charge === 0,
    kind: charge === 0 ? "neutral" : charge > 0 ? "cation" : "anion",
    stable: STABILITY[`${p}-${p + n}`] ?? null,
  };
}
/** مدل لایه‌ای ساده. مس استثنا: ۲، ۸، ۱۸، ۱ (با آرایش زیرلایه‌ای یکسان نیست) */
export function shells(e: number, p = 0): number[] {
  if (p === 29 && e === 29) return [2, 8, 18, 1];
  const out: number[] = []; let r = e;
  for (const c of [2, 8, 8, 18, 32]) { if (r <= 0) break; out.push(Math.min(c, r)); r -= c; }
  return out;
}
