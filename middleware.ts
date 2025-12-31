import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value

    const isAppRoute = request.nextUrl.pathname.startsWith("/chat")
        || request.nextUrl.pathname.startsWith("/projects")
        || request.nextUrl.pathname.startsWith("/about")

    if (isAppRoute && !token) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/chat/:path*", "/projects/:path*", "/about/:path*"],
}