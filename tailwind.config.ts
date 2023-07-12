import { type Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // sansSerif: ['var(--font-archivo)']
        // primary: ['var(--font-archivo)'],
        // serif: ['var(--font-archivo)'],
        // 'playfair': ['Playfair Display', 'serif'],
        // 'ibm': ['IBM Plex Sans', 'sans-serif'],
        // 'lora': ['Lora', 'serif'],
        // 'archivo': ['Archivo', 'sans-serif'],
        // 'merriweathersans': ['Merriweather Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
} satisfies Config;
