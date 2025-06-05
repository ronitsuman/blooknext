import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  const protectedRoutes = ["/dashboard"]
  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to appropriate dashboard if logged in and accessing login/register
  if (session && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
    // Get user profile to determine redirect
    const { data: profile } = await supabase.from("users").select("role").eq("id", session.user.id).single()

    if (profile) {
      const dashboardUrl = new URL(`/dashboard/${profile.role.replace("_", "-")}`, req.url)
      return NextResponse.redirect(dashboardUrl)
    }
  }

  return res
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
