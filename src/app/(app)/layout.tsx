import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/appSideBar";
import { getSession } from "@/auth"
import Providers from "@/providers"
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'Imaginary',
}
export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  const session = await getSession()

  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="dark flex flex-col h-screen font-inter">
        <Providers session={session}>
          <SidebarProvider>
            <AppSideBar />
            <main className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <div className="p-4 pt-5 overflow-auto h-full">
                {children}
              </div>
            </main>
          </SidebarProvider>
        </Providers>
      </body>
    </html >
  );
}
