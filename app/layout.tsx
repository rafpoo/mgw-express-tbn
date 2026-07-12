import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { business } from "./business";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Jasa Pengiriman Luar Negeri Tabanan | Maigeiwo Express",
    template: "%s | Maigeiwo Express Tabanan",
  },
  description: business.description,
  keywords: ["jasa pengiriman luar negeri Tabanan", "kirim paket ke luar negeri dari Bali", "ekspedisi internasional Tabanan", "Maigeiwo Express Tabanan"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "id_ID", url: "/", siteName: business.name,
    title: "Kirim Paket ke Luar Negeri dari Tabanan", description: business.description,
    images: [{ url: "/images/kantor-maigeiwo-tabanan.png", width: 1365, height: 1025, alt: "Kantor Maigeiwo Express Tabanan" }],
  },
  twitter: { card: "summary_large_image", title: business.name, description: business.description, images: ["/images/kantor-maigeiwo-tabanan.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" className={manrope.variable}><body>{children}</body></html>;
}
