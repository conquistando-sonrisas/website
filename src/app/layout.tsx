import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Roboto } from 'next/font/google'
import theme from "./theme";
import AppThemeProvider from "./components/ThemeProvider";

const roboto = Roboto({
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
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <AppThemeProvider theme={theme}>
            <Navbar />
            {children}
            <Footer />
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html >
  );
}
