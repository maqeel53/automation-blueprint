/**
 * Suppress known, non-critical browser console errors that do not
 * indicate real test failures (e.g. third-party tracking, favicon).
 */
const KNOWN_ERRORS = [
  'favicon.ico',
  'Failed to load resource',
  'third-party',
]

export function handleUncaughtExceptions(page) {
  page.on('pageerror', (err) => {
    const msg = err.message || ''
    const isKnown = KNOWN_ERRORS.some((k) => msg.includes(k))
    if (!isKnown) {
      console.error(`[Uncaught Error] ${msg}`)
    }
  })
}
