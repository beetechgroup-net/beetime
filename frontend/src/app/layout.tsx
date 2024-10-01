// src/app/layout.tsx

'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import Content from "@/app/Content";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en">
      <body>
      <SessionProvider>
        <Content>{children}</Content>
      </SessionProvider>
      </body>
      </html>
  );
}
