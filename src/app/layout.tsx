'use client';

import { useTheme } from 'next-themes';
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
import { LayoutASidebar } from './components/layoutASidebar';

import useFilterStore from '@/stores/useFilterStore';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const { filter } = useFilterStore();

  return (
    <html lang="en">
      <head>
        <title>stock potatomap - AI 변동율 예측</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="AI를 사용하여 1시간 뒤부터 1년까지의 변동율을 예측하고, 소팅 및 다양한 필터를 통해 데이터를 분석할 수 있는 사이트입니다."
        />
        <meta
          name="keywords"
          content="AI, 변동율 예측, 주식, 소팅, 필터, 데이터 분석"
        />
        <meta name="author" content="ykjung" />
        <meta property="og:title" content="Stock Potatomap - AI 변동율 예측" />
        <meta
          property="og:description"
          content="AI를 사용하여 1시간 뒤부터 1년까지의 변동율을 예측하고, 소팅 및 다양한 필터를 통해 데이터를 분석할 수 있는 사이트입니다."
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1621264437251-59d700cfb327?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <meta property="og:url" content="https://stock.potatomap.com/" />
        <meta
          name="twitter:card"
          content="https://images.unsplash.com/photo-1621264437251-59d700cfb327?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        {/* 기타 head 요소 */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <SidebarProvider>
              <LayoutSidebar />
              <div
                className={`w-full h-svh flex flex-col divide-y overflow-hidden bg-sidebar`}
              >
                <LayoutHeader />
                <div className="grow-1 h-full flex overflow-hidden divide-x">
                  <ScrollArea>
                    {children}
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                  {filter.asideOpen && (
                    <div className="h-full">
                      <LayoutASidebar />
                    </div>
                  )}
                </div>
              </div>
            </SidebarProvider>
            <LayoutDialog />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
