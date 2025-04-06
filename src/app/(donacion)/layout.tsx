import { CssBaseline, GlobalStyles } from "@mui/material"
import '../(web)/globals.css'
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { Lexend } from "next/font/google"
import { ReactNode } from "react"
import theme from "../(web)/theme"
import AppThemeProvider from "../(web)/components/ThemeProvider"
import { Navbar } from "./components/Navbar"
import Footer from "../(web)/components/Footer"

const lexend = Lexend({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})


export default function DonacionLayout({ children }: { children: ReactNode }) {


  return (
    <html lang='es'>
      <body className={lexend.className}>
        <AppRouterCacheProvider>
          <AppThemeProvider theme={theme}>
            <Navbar />
            <CssBaseline />
            <GlobalStyles styles={{
              body: {
                backgroundColor: '#f1f7fc'
              }
            }} />
            {children}
            <Footer />
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}