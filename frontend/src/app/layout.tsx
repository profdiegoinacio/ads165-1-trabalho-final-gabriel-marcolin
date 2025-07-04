import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import SessionProviderWrapper from "@/app/components/security/session-provider-wrapper";
import AuthStatus from "@/app/components/security/auth-status";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProviderWrapper>
            <nav className="w-full bg-purple-900 border-b border-purple-900 py-4 px-6 flex justify-between items-center shadow-sm">
                <div className="flex gap-6">
                    <Link href="/servicos">
                        <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                            Serviços
                        </button>
                    </Link>
                    <Link href="/historico">
                        <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                            Histórico
                        </button>
                    </Link>
                </div>

                <div className="min-w-[200px]">
                    <AuthStatus />
                </div>
            </nav>

            {children}

            <footer className="mt-10 w-full border-t border-gray-200 py-6 text-center text-sm text-gray-500">
                <p>Todos os direitos reservados</p>
                <p>Gabriel Marcolin</p>
                <p>2025</p>
            </footer>
        </SessionProviderWrapper>
        </body>
        </html>
    );
}