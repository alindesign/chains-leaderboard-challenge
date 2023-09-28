'use client';
import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/lib/react-query';
import { ThemeRegistry } from '@/components/theme-registry';

export function Provider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </QueryClientProvider>
  );
}
