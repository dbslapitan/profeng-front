import type { Metadata } from "next";
import "./globals.scss";
import HeaderNav from "@/components/header-nav/HeaderNav";
import { Suspense } from "react";
import Loading from "./loading";
import {titilium} from "../libs/fonts";

export const metadata: Metadata = {
    title: "ProfEng",
    description: "ProfEng(Profecient English) is a web application that aims to increase the English Proficiency of users. It leverages the power of AI through ChatGPT to provide real-time feedback empowering users to enhance their proficiency in English effectively and confidently.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={titilium.className}>
                <HeaderNav></HeaderNav>
                <main>
                    <Suspense>
                        {children}
                    </Suspense>
                </main>
            </body>
        </html>
    );
}
