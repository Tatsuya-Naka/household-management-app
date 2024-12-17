import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { API_AUTH_PREFIX, authRoutes, DEFAULT_LOGIN_REDIRECT, DEFAULT_REDIRECT, privateRoutes, publicRoutes, setAuthRoutes } from "./routes";
import { NextResponse } from "next/server";

const {auth: middleware} = NextAuth(authConfig);

export default middleware((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    
    const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
    
    if (isApiAuthRoute) {
        return;
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (isPublicRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (isPrivateRoute) {
        if (!isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return;
});

export const apiMiddleware = (req: Request) => {
    const allowedOrigins = ['https://household-management-app.vercel.app', 'http://localhost:3000']; // Adjust based on your frontend URLs
    const origin = req.headers.get('origin');
  
    // Check if the origin is allowed
    if (allowedOrigins.includes(origin as string)) {
      const response = NextResponse.next(); // Continue processing the request
  
      // Set CORS headers
      response.headers.set('Access-Control-Allow-Origin', origin as string);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      // Handle preflight requests (OPTIONS method)
      if (req.method === 'OPTIONS') {
        // Respond with status 200 and end the request
        return response;
      }
  
      return response;
    }
  
    return NextResponse.next();
  };

// Do not miss to correctly handle the above
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}