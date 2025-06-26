import { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { Providers } from "@/app/providers";
import "@/styles/globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.description}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Automação",
    "n8n",
    "WhatsApp",
    "Redes Sociais",
    "Produtividade",
    "Integração",
    "Tecnologia",
    "Inovação",
  ],
  authors: [
    {
      name: "Lucidium Team",
      url: siteConfig.url,
    },
  ],
  creator: "Lucidium",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@lucidiumai",
  },
  icons: {
    icon: "/images/logo.svg",
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
    languages: {
      'pt-BR': "/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${firaCode.variable} scroll-smooth`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </Providers>
        
        {/* Schema.org JSON-LD para SEO */}
        <Script
          id="schema-org-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": siteConfig.name,
              "url": siteConfig.url,
              "logo": `${siteConfig.url}/images/logo.svg`,
              "description": siteConfig.description,

              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": siteConfig.contact.phone,
                "contactType": "customer service",
                "email": siteConfig.contact.email
              },
              "sameAs": [
                siteConfig.links.twitter,
                siteConfig.links.github,
                siteConfig.links.linkedin,
                siteConfig.links.instagram
              ]
            })
          }}
        />
      </body>
    </html>
  );
} 