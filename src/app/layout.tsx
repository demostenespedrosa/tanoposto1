import type {Metadata} from 'next';
import './globals.css';
import { RootLayoutClient } from './layout-client'

export const metadata: Metadata = {
  title: 'Tá no Posto | Economia Inteligente',
  description: 'O ecossistema de elite para fidelidade em postos e economia de combustível.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-primary-foreground bg-slate-50 text-slate-900">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}