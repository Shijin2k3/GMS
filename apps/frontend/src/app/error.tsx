'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled segment error:', error);
  }, [error]);

  const handleRetry = () => {
    reset();
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="relative mb-8">
        <div className="absolute -inset-4 rounded-full bg-destructive/10 blur-xl animate-pulse" />
        <AlertCircle className="w-20 h-20 text-destructive relative" />
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-3 text-foreground">
        Something went wrong
      </h1>
      <p className="text-muted-foreground max-w-[450px] mb-8 text-lg">
        An unexpected error occurred while loading this section. Our team has been notified and is
        looking into it.
      </p>

      {error.digest && (
        <code className="mb-8 px-3 py-1 bg-muted rounded text-xs font-mono text-muted-foreground border border-border">
          Error ID: {error.digest}
        </code>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleRetry}
          size="lg"
          className="gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
        >
          <RefreshCcw className="w-4 h-4" />
          Try again
        </Button>
        <Button
          variant="outline"
          size="lg"
          asChild
          className="gap-2 transition-all hover:bg-accent/50"
        >
          <Link href="/">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <p className="mt-12 text-sm text-muted-foreground/60 italic">
        If the problem persists, please contact support.
      </p>
    </div>
  );
}

