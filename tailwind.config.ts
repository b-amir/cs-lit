import { type Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // 
      },
      colors: {
        'default': '#2A2A2E', // Default text color
        'dark-1': '#7E7E81',
        'dark-2': '#2A2A2E',

        'accent': '#FF7263', // Accent color
        'accent-light': '#FFB8B0', // Accent color
        'accent-lighter': '#ECDEDA',

        'gray-1': '#F9F9F9',
        'gray-2': '#EBEAE8',
        'gray-3': '#EFF0F1',
        'gray-4': '#FDFDFD',
        'gray-5': '#2a2a2e3b',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
} satisfies Config;
