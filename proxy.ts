import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest, NextResponse } from 'next/server'

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  urlMappingStrategy: "rewrite"
})
export { auth as Proxy } from "./lib/auth"
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }
  return I18nMiddleware(request)
}
export const config = {
  // تحديث الـ matcher ليتجاهل مسارات الـ api والـ auth بشكل صارم ومنع تشغيله عليها أصلاً
  matcher: ['/((?!api|auth|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}