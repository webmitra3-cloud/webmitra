import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth-context";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { ThemeProvider } from "@/context/theme-context";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import { queryClient } from "@/lib/query-client";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ErrorBoundary>
            <ScrollToTop />
            <Component {...pageProps} />
          </ErrorBoundary>
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
