
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "@/components/provider/ContextProvider";
import { Toaster } from "sonner";
import NextAuthProviders from "./NextAuthProviders";
import dynamic from "next/dynamic";


const Footer = dynamic(() => import("@/components/footer/Footer"), { ssr: false });

const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: '--font-jakarta'
})

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
  title: {
    default: 'Tendencia de Noticias - San Miguel de Tucumán',
    template: '%s - Tendencia de Noticias',
  },
  description: 'Mantente al día con las últimas noticias de política, economía y negocios, deportes, tendencias y el sector azucarero en San Miguel de Tucumán. Tendencia de Noticias te ofrece una cobertura completa y actualizada de los eventos más relevantes de la región.',
  keywords: [
    'San Miguel de Tucumán',
    'Noticias',
    'Política',
    'Economía',
    'Negocios',
    'Deportes',
    'Tendencias',
    'Caña de azúcar',
  ],
  openGraph: {
    title: 'Tendencia de Noticias - San Miguel de Tucumán',
    images: [
      {
        url: '/icon.jpg',
        alt: 'Tendencia de Noticias',
      }
    ],
    description: 'Mantente al día con las últimas noticias de política, economía y negocios, deportes, tendencias y el sector azucarero en San Miguel de Tucumán. Tendencia de Noticias te ofrece una cobertura completa y actualizada de los eventos más relevantes de la región.',
    url: `${process.env.NEXT_PUBLIC_URL}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tendenciadenoticias',
    title: 'Tendencia de Noticias - San Miguel de Tucumán',
    description: 'Mantente al día con las últimas noticias de política, economía y negocios, deportes, tendencias y el sector azucarero en San Miguel de Tucumán.',
    images: '/icon.jpg',
  },
  referrer: 'origin-when-cross-origin',
  creator: 'Insiders Agencia & MVDEV',
  publisher: 'Insiders Agencia & MVDEV',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn("min-h-screen bg-background antialiased text-foreground", fontJakarta.className)}>
        <NextAuthProviders>
          <ContextProvider>
            {children}
            <Footer />
          </ContextProvider>
        </NextAuthProviders>
        <Toaster className="mx-auto" />
      </body>
    </html>
  );
}
