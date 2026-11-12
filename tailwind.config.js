/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#B22222",     // أحمر غامق - يفتح الشهية
          gold: "#F4B400",    // أصفر ذهبي - الأكل والطاقة
          brown: "#5D4037",   // بني غامق - خشب وتراث
          cream: "#F8F5F0",   // أوف وايت - خلفيات
          charcoal: "#2E2E2E",// فحمي - نصوص
        },
      },
      fontFamily: {
        display: ["var(--font-changa)", "sans-serif"],   // عناوين كبيرة
        body: ["var(--font-cairo)", "sans-serif"],        // نصوص عادية
        accent: ["var(--font-amiri)", "serif"],           // جملة تراثية مميزة
        en: ["var(--font-poppins)", "sans-serif"],        // نصوص إنجليزية لو احتجنا
      },
      keyframes: {
        steam: {
          "0%":   { transform: "translateY(0) scale(1)",   opacity: "0" },
          "20%":  { opacity: "0.55" },
          "100%": { transform: "translateY(-42px) scale(1.4)", opacity: "0" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
      },
      animation: {
        steam1: "steam 2.6s ease-in infinite",
        steam2: "steam 2.6s ease-in infinite 0.9s",
        steam3: "steam 2.6s ease-in infinite 1.7s",
        floatSlow: "floatSlow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};