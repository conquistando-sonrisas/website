import type { Metadata } from "next";
import 'material-symbols';
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Lexend } from "next/font/google";
import theme from "./theme";
import AppThemeProvider from "./components/ThemeProvider";
import { CssBaseline, GlobalStyles } from "@mui/material";

const lexend = Lexend({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: "Conquistando Sonrisas A.C.",
  description: "Conquistando Sonrisas A.C. es una asociación civil que apoya de manera integral a niños, niñas y adolescentes con diagnostico de cáncer, brindando un servicio oportuno a través de personas lideres, comprometidas y solidarias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <AppRouterCacheProvider>
          <AppThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={{
              body: {
                backgroundColor: '#f1f7fc'
              }
            }} />
            <Navbar />
            {children}
            <Footer />
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html >
  );
}
