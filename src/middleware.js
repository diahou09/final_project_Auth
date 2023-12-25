import { NextResponse } from "next/server";
import * as jose from "jose";

export default async function middleware(request) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/login", request.nextUrl));
  }

  // console.log(cookie);

  const token = request.cookies.get("token")?.value;
  // console.log(token);

  if (token) {
    // const secretKey = jose.base64url.decode(process.env.NEXT_PUBLIC_SECRET_KEY);
    // const { payload } = await jose.jwtDecrypt(token, secretKey);

    try {
      const secretKey = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_SECRET_KEY
      );
      await jose.jwtVerify(token, secretKey);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
