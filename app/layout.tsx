import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { cookies } from "next/headers";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const themeCookie = cookies().get("theme")
    const theme = themeCookie?.value || "day"

    return (
        <html lang="en" className={theme}>
            <UserProvider>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}>
                    {children}
                </body>
            </UserProvider>
        </html>
    );
}
