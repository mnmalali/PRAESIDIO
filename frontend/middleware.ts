// Modified for PRAESIDIO AI, 2026-11-19: public brand icon and stale-session recovery.
// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 SecureAgentics

import { NextRequest, NextResponse } from 'next/server'

// Single-domain Praesidio. Single cookie. Single auth path.
//
// /login + /change-password are public (the user is on their way to
// authenticating or completing first-login). Every other route
// requires the praesidio_token cookie. On 401 the api wrapper handles
// the redirect; this middleware short-circuits the unauthenticated
// fetch so the user lands on /login rather than a flash of the
// requested page.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('praesidio_token')

  if (pathname === '/login' || pathname === '/change-password') {
    // Cookie presence does not prove validity. A revoked/expired HttpOnly cookie
    // must be allowed to reach login; otherwise API 401 -> login -> / loops.
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|icon.svg|api).*)'],
}
