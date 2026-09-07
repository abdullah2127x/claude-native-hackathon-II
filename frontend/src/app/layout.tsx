import type { Metadata } from "next";
import { TasksProvider } from "@/providers/tasks-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

export const metadata: Metadata = {
  title: "TaskCortex",
  description: "A modern todo application with authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <Script
          src="https://resolvdesk.vercel.app/widget.js"
          data-widget-key="rd_live_frRwD7a6Avc9PrUJVaH8OSXc18pprshaSBP3QI4kOlc"
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TasksProvider>{children}</TasksProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
