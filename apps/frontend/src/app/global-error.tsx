'use client';

import { useEffect } from 'react';
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import './global.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Critical root error:', error);
  }, [error]);

  const handleRetry = () => {
    reset();
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <title>System Failure | GMS</title>
      </head>
      <body className="h-full bg-background text-foreground antialiased flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-destructive/20 blur-2xl animate-pulse" />
              <div className="relative bg-destructive/10 p-4 rounded-2xl border border-destructive/20">
                <AlertTriangle className="w-12 h-12 text-destructive" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            System Failure
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            A critical error occurred at the foundation of the application. We've encountered a
            problem we couldn't recover from automatically.
          </p>

          <button
            onClick={handleRetry}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white transition-all bg-primary rounded-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/25"
          >
            <RefreshCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
            Restart Application
          </button>

          {error.digest && (
            <div className="mt-12 pt-8 border-t border-border">
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-mono text-muted-foreground ring-1 ring-inset ring-border">
                Diagnostic Code: {error.digest}
              </span>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}

