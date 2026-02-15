import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Energia Solar e Projetos Elétricos em Piraju e Região | Horizen Soluções",
  description:
    "Empresa especializada em energia solar, projetos elétricos BT/MT, automação e soluções técnicas com alto padrão em Piraju/SP e região, segurança e conformidade normativa.",
  metadataBase: new URL('https://www.horizen.com.br'),
    keywords: [
    "energia solar",
    "projeto elétrico",
    "engenharia elétrica",
    "BT MT",
    "homologação concessionária",
    "usina solar",
    "cabine primária",
    "automação industrial",
  ],
  authors: [{ name: "Horizen Soluções" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Horizen Soluções",
    description:
      "Soluções completas em energia solar e engenharia elétrica com padrão técnico e conformidade normativa.",
    url: "https://horizen.com.br",
    siteName: "Horizen Soluções",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
