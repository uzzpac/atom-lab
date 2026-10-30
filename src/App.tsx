import { atomInfo, shells } from "./logic/atom";
import { useSim } from "./store/simulationStore";
import AtomScene from "./scenes/AtomScene";

const PRESETS: Record<string, [number, number, number]> = { هیدروژن: [1, 0, 1], "کربن‌۱۲": [6, 6, 6], "کربن‌۱۴": [6, 8, 6], سدیم: [11, 12, 11], "Na⁺": [11, 12, 10], کلر: [17, 18, 17], "Cl⁻": [17, 18, 18], مس: [29, 34, 29] };
const fa = (n: number) => (n === 0 ? "۰" : n > 0 ? `+${n}` : `−${Math.abs(n)}`);

export default function App() {
  const s = useSim(); const i = atomInfo(s.p, s.n, s.e);
  return (
    <div className="app">
      <header>⚛ آزمایشگاه اتم <small>مدل بزرگ‌نمایی‌شده و آموزشی است</small></header>
      <main><AtomScene /></main>
      <section className="panel">
        <div className="row">{(["p", "n", "e"] as const).map((k) => (
          <div className="ctr" key={k}><b>{{ p: "پروتون p⁺", n: "نوترون n⁰", e: "الکترون e⁻" }[k]}</b>
            <button aria-label="کم" onClick={() => s.bump(k, -1)}>−</button><span>{s[k]}</span><button aria-label="زیاد" onClick={() => s.bump(k, 1)}>+</button></div>))}</div>
        <div className="info">
          <div><i>عدد اتمی</i>{i.Z}</div><div><i>عدد جرمی</i>{i.A}</div><div><i>بار خالص</i>{fa(i.charge)}</div>
          <div><i>عنصر</i>{i.element ? `${i.element.name} (${i.element.symbol})` : "—"}</div>
          <div><i>وضعیت</i>{{ neutral: "اتم خنثی", cation: "یون مثبت", anion: "یون منفی" }[i.kind]}</div>
          <div><i>پایداری</i>{i.stable === null ? "داده کافی نیست" : i.stable ? "پایدار" : "ناپایدار"}</div>
          <div><i>لایه‌ها</i>{shells(s.e, s.p).join("، ") || "—"}</div></div>
        <div className="row">{Object.entries(PRESETS).map(([k, [p, n, e]]) => <button key={k} onClick={() => s.set({ p, n, e })}>{k}</button>)}</div>
        <div className="row">
          <button onClick={() => s.set({ cloud: !s.cloud })}>{s.cloud ? "مدل: ابر احتمال" : "مدل: لایه‌ای ساده"}</button>
          <button onClick={() => s.set({ exploded: !s.exploded })}>{s.exploded ? "بازگرداندن" : "جدا کردن اجزا"}</button>
          <button onClick={() => s.set({ paused: !s.paused })}>{s.paused ? "ادامه" : "توقف"}</button>
          <button onClick={() => s.set({ bloom: !s.bloom })}>{s.bloom ? "کم‌مصرف: خاموش" : "کم‌مصرف: روشن"}</button></div>
      </section>
    </div>
  );
}
