import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'ibm': ['IBM Plex Sans', 'sans-serif'],
        'lora': ['Lora', 'serif'],
        'archivo': ['Archivo', 'sans-serif'],
        'merriweathersans': ['Merriweather Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
