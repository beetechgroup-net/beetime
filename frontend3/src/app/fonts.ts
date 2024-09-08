import { Nunito_Sans, Roboto, Lato } from "next/font/google"

const nunito = Nunito_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
})
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
})

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
})

export { nunito, roboto, lato }
