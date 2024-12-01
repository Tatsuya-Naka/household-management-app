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
    verificationEmailSentPage() {
        return "/new-user/email/confirm";
    },
    resetPasswordUrl() {
        return "/reset/password";
    },
    verificationPassword() {
        return "/reset/password/verification";
    },
    verificationPasswordSentPage() {
        return "/reset/password/confirm";
    },
    resetPasswordSuccessUrl() {
        return "/reset/password/success";
    },
}

export default paths;