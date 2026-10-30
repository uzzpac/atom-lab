# آزمایشگاه سه‌بعدی اتم (React 19 + R3F 9 + Drei 10 + Three.js + Zustand + Vite)

## اجرا
    npm install
    npm run dev      # محیط توسعه
    npm test         # تست منطق علمی (Vitest)
    npm run build    # ساخت نسخهٔ نهایی

## ساختار
- `src/logic` منطق علمی و تست‌ها (جدا از گرافیک)
- `src/scenes` صحنه‌های سه‌بعدی (R3F)
- `src/store` وضعیت شبیه‌سازی (Zustand)
- فونت وزیرمتن از بستهٔ `@fontsource/vazirmatn` (محلی پس از نصب)

## وضعیت
این اسکلت هنوز نصب و اجرا نشده است. نسخه‌های وابستگی‌ها را پس از `npm install` بررسی کنید.
باقی‌مانده: صحنه‌های یون، ایزوتوپ، جریان برق، مولکول، درس‌ها، آزمون و حالت تدریس (نمونهٔ کارکرد در atom-lab.html).

## انتشار روی گیتهاب و لینک عمومی
1. در github.com مخزن عمومی جدید بسازید (مثلاً `atom-lab`) بدون README.
2. در پوشهٔ پروژه:

        git init
        git add .
        git commit -m "نسخه اولیه"
        git branch -M main
        git remote add origin https://github.com/USERNAME/atom-lab.git
        git push -u origin main

3. در مخزن: Settings ← Pages ← Source را روی **GitHub Actions** بگذارید.
4. تب Actions را ببینید؛ پس از سبز شدن، لینک عمومی این است:
   `https://USERNAME.github.io/atom-lab/`
