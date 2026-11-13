import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Nexus Dashboard — Multi-System Overview',
  description: 'Customizable Multi-Tenant Dashboard with AI Prompts & War Room',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen p-3 md:p-5 flex justify-center items-start text-slate-800">
        {children}
      </body>
    </html>
  );
}
