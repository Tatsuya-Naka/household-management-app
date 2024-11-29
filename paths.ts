const paths = {
    default() {
        return "/";
    },
    home() {
        return "/dashboard";
    },
    logInUrl() {
        return "/log-in";
    },
    signInUrl() {
        return "/new-user";
    },
    signInEmailUrl() {
        return "/new-user/email";
    },
    registerInfoUrl() {
        return "/new-user/register";
    },
    authPrefix() {
        return "/api/auth";
    },
    errorUrl() {
        return "/error";
    },
    verificationEmail() {
        return "/new-user/email/new-verification";
    },
}

export default paths;