import type { Metadata } from 'next';
import './globals.css';
import MenuBar from '@/components/MenuBar';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'entretiens',
  description: 'Flux d\'authentification utilisateur par Firebase Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full bg-background text-foreground">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex flex-col min-h-screen">
              <MenuBar />
              <main className="flex-grow">
                {children}
              </main>
            </div>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
