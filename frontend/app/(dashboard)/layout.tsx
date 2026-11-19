// Modified for PRAESIDIO AI, 2026-11-19: branding, presentation and accessibility.
// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 SecureAgentics

'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="flex">
      <a href="#console-main" className="praesidio-skip">Skip to content</a>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:ml-64 flex-1 min-w-0 min-h-dvh bg-surface">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main id="console-main" className="p-4 md:p-8 max-w-[1600px] mx-auto">{children}</main>
      </div>
    </div>
  )
}
