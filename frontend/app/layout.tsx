// Modified for PRAESIDIO AI, 2026-11-19: branding, presentation and accessibility.
// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 SecureAgentics

import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider, themeInitScript } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'PRAESIDIO AI | Security console',
  description: 'PRAESIDIO AI security console: agent activity, policy and human review.',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
