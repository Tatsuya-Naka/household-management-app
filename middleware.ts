import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { API_AUTH_PREFIX, authRoutes, DEFAULT_LOGIN_REDIRECT, DEFAULT_REDIRECT, publicRoutes, setAuthRoutes } from "./routes";

const {auth: middleware} = NextAuth(authConfig);

export default middleware((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    
    const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isSetAuthRoute = setAuthRoutes.includes(nextUrl.pathname);
    
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

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return;
});

// Do not miss to correctly handle the above
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}