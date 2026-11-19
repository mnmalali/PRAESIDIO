// Modified for PRAESIDIO AI, 2026-11-19: branding, presentation and accessibility.
// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 SecureAgentics

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BrandMark } from '@/components/brand-mark'
import { api, ApiError } from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@localhost')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const res = await api<{ data: { must_change_password: boolean } }>(
        '/api/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        },
      )
      if (res.data.must_change_password) {
        router.push('/change-password')
      } else {
        router.push('/')
      }
    } catch (e) {
      if (e instanceof ApiError) {
        setError(e.message || 'Sign-in failed')
      } else {
        setError('Sign-in failed')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6"><BrandMark /></div>
        <h1 className="text-2xl text-ink mb-2 text-center">PRAESIDIO AI</h1>
        <p className="text-sm text-ink-3 text-center mb-8">Your agents. Your boundary.</p>
        <form aria-busy={busy} onSubmit={handleSubmit} className="space-y-4 bg-surface-raised border border-surface-border rounded-xl p-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink-3 mb-2">Email</label>
            <input
              type="email"
              id="email" autoComplete="username" aria-describedby={error ? "form-error" : undefined} aria-invalid={Boolean(error)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface border border-surface-border rounded px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink-3 mb-2">Password</label>
            <input
              type="password"
              id="password" autoComplete="current-password" aria-describedby={error ? "form-error" : undefined} aria-invalid={Boolean(error)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full bg-surface border border-surface-border rounded px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
            />
          </div>
          {error && (
            <div id="form-error" role="alert" className="text-sm text-ink bg-danger/10 border border-danger/30 rounded px-3 py-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-ink text-surface-raised font-mono font-semibold py-2 rounded hover:bg-ink-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {busy ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="text-sm text-ink-3 text-center mt-6">
          Self-hosted security console. To reset a lost password, run <code className="text-ink-2 break-words">docker compose --profile setup run --rm setup reset-password</code> from the source directory.
        </p>
      </div>
    </div>
  )
}
