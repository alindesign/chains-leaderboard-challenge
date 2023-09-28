import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Provider } from '@/app/provider';
import { StyledBody } from './styles';

const globalFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chains Leaderboard',
  description: 'Growth Team Challenge - Chains Leaderboard',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <StyledBody className={globalFont.className}>
        <Provider>{children}</Provider>
      </StyledBody>
    </html>
  );
}
