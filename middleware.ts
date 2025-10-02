import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const publicRoutes = ["/", "/api/auth/login", "/api/auth/signup"];
    if (publicRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.next();
    }
    const token = req.cookies.get('token')?.value;

    if (!token) return NextResponse.redirect(new URL('/', req.url));

    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.next();
    }catch (error) {
        return NextResponse.redirect(new URL('/', req.url));
    }
}

export const config = {
    matcher: ['/userDashboard/:path*'],
}