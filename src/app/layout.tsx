import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
    title: "Profeng",
    description: "ProfEng is a web application that aims to increase the English Proficiency of users. It leverages the power of AI through ChatGPT to provide real-time feedback empowering users to enhance their proficiency in English effectively and confidently.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
