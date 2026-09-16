import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // `locked` excluded: /locked/[client] has its own root layout
  // ((locked)/layout.tsx) and must never be locale-prefixed or rewritten —
  // /tr/locked/fuzul and /en/locked/fuzul must 404, not serve the report.
  matcher: ['/((?!api|trpc|_next|_vercel|studio|og|locked|.*\\..*).*)'],
}
