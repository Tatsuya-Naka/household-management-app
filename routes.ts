import paths from "./paths";

export const publicRoutes = [
    paths.default(),
    paths.errorUrl(),
    paths.verificationEmail(),
]

export const authRoutes = [
    paths.logInUrl(),
    paths.signInEmailUrl(),
    paths.signInUrl(),
]

export const setAuthRoutes = [
    paths.registerInfoUrl(),
]

export const API_AUTH_PREFIX = paths.authPrefix();
export const DEFAULT_REDIRECT = paths.default();
export const DEFAULT_LOGIN_REDIRECT = paths.home();
export const DEFAULT_SIGNIN_EMAIL_REDIRECT = paths.home();
export const DEFAULT_SIGNIN_REDIRECT = paths.registerInfoUrl();