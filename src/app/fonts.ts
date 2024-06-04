import { Lato } from "next/font/google";
import { Merriweather } from "next/font/google";

export const fontLato = Lato({
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
    variable: '--font-lato'
})

export const fontMerriweather = Merriweather({
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
    variable: '--font-merriweather'
})