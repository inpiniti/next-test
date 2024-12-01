'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

import { SidebarProvider } from '@/components/ui/sidebar';
import LayoutHeader from './components/layoutHeader';
import LayoutSidebar from './components/layoutSidebar';
import LayoutDialog from './components/layoutDialog';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* 기타 head 요소 */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <LayoutSidebar />
            <div className="w-full h-svh flex flex-col divide-y overflow-hidden">
              <LayoutHeader />
              <div className="grow-1 h-full overflow-scroll">{children}</div>
            </div>
          </SidebarProvider>
        </QueryClientProvider>
        <LayoutDialog />
      </body>
    </html>
  );
}
