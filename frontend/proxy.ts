import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";



const SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);



async function getRole(token: string) {
  const { payload } = await jwtVerify(token, SECRET);
  
  return payload.role as "candidate" | "recruiter" | "admin" | undefined;
}

export async function proxy(request: NextRequest) {
  
  const { pathname } = request.nextUrl;

  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    if (
      pathname.startsWith("/candidate") ||
      pathname.startsWith("/recruiter") ||
      pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  try {
    const role = await getRole(refreshToken);

    if (!role) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/login") {
      const dashboard =
        role === "candidate"
          ? "/candidate/dashboard"
          : role === "recruiter"
          ? "/recruiter/dashboard"
          : "/admin/dashboard";

      return NextResponse.redirect(new URL(dashboard, request.url));
    }

    if (pathname.startsWith("/candidate") && role !== "candidate") {
      return NextResponse.redirect(
        new URL(
          role === "recruiter"
            ? "/recruiter/dashboard"
            : "/admin/dashboard",
          request.url
        )
      );
    }

    if (pathname.startsWith("/recruiter") && role !== "recruiter") {
      return NextResponse.redirect(
        new URL(
          role === "candidate"
            ? "/candidate/dashboard"
            : "/admin/dashboard",
          request.url
        )
      );
    }

    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(
        new URL(
          role === "candidate"
            ? "/candidate/dashboard"
            : "/recruiter/dashboard",
          request.url
        )
      );
    }

    return NextResponse.next();
  } catch(err :any) {
    console.error("Proxy JWT error:", err);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};