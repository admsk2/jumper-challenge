// next imports
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";

// ui imports
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

// internal imports
import theme from '../theme';
import Providers from "./providers";

// config
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jumper Challenge",
  description: "made by admsk2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // read browser cookies
  const cookie = headers().get("cookie");
  // default view
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Providers cookie={cookie}>{children}</Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
    </html>
  );
}
