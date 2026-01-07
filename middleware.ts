import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value

    const isAppRoute = request.nextUrl.pathname.startsWith("/chat")
        || request.nextUrl.pathname.startsWith("/projects")
        || request.nextUrl.pathname.startsWith("/activities")
        || request.nextUrl.pathname.startsWith("/home")
        || request.nextUrl.pathname.startsWith("/profile")
        || request.nextUrl.pathname.startsWith("/test-nivelacion")

    if (isAppRoute && !token) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/chat/:path*", "/projects/:path*", "/activities/:path*", "/test-nivelacion/:path*", "/home/:path*", "/profile/:path*"],
}