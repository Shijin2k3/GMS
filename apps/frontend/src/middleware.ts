import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    // If no token → redirect to login
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // user is authenticated → continue
    return NextResponse.next();
}

// protect specific routes
export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"],
};
