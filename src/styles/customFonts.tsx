import { Archivo } from "next/font/google";

// in order to benefit from the new '@next/font' font optimization,
// the google fonts (and possible local fonts) are imported through this package
// and not the tailwind way.

export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "block",
  preload: true,
});
