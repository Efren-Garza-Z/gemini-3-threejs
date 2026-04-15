import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    // // Autenticación temporalmente deshabilitada para permitir acceso público universal
    // const token = request.cookies.get("token")?.value
    //
    // const isAppRoute = request.nextUrl.pathname.startsWith("/chat")
    //     || request.nextUrl.pathname.startsWith("/projects")
    //     ...
    //
    // if (isAppRoute && !token) {
    //     return NextResponse.redirect(new URL("/", request.url))
    // }

    return NextResponse.next()
}
export const config = {
    matcher: [
        "/chat/:path*",
        "/projects/:path*",
        "/activities/:path*",
        "/test-nivelacion/:path*",
        "/home/:path*",
        "/profile/:path*",
        "/ielts/:path*",
        "/writing/:path*",
        "/reading/:path*"],
}