import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { API_AUTH_PREFIX, authRoutes, DEFAULT_LOGIN_REDIRECT, DEFAULT_REDIRECT, publicRoutes } from "./routes";

const {auth: middleware} = NextAuth(authConfig);

export default middleware((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    
    const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    
    if (isApiAuthRoute) {
        return;
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return;
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}