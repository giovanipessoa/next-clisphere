import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ClíSphere",
    description:
        "Plataforma de Gerenciamento para Clínicas e Profissionais de Saúde",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastProvider>{children}</ToastProvider>
            </body>
        </html>
    );
}
