import paths from "./paths";

export const publicRoutes = [
    paths.default(),
    paths.errorUrl(),
    paths.verificationEmail(),
    paths.verificationEmailSentPage(),
    paths.verificationPassword(),
    paths.verificationPasswordSentPage(),
    paths.resetPasswordSuccessUrl(),
]

export const authRoutes = [
    paths.logInUrl(),
    paths.signInEmailUrl(),
    paths.signInUrl(),
    paths.resetPasswordUrl(),
]

export const setAuthRoutes = [
    paths.registerInfoUrl(),
]

export const privateRoutes = [
    paths.recordsPageUrl(),
    paths.newRecordPageUrl(),
    paths.communityPageUrl(),
    paths.settingPageUrl(),
    paths.logOutPageUrl(),
    paths.newRecordConfirmUrl(),
    paths.recordsIncomeUrl(),
    paths.recordsExpensesUrl(),
    paths.recordsSavingsUrl(),
    paths.recordsListsPageUrl(),
    paths.recordsListsAppliedPageUrl(),
    paths.recordsListsProcessingPageUrl(),
    paths.xrate(),
    paths.SettingFriends(),
    paths.SettingAccount(),
]

export const API_AUTH_PREFIX = paths.authPrefix();
export const DEFAULT_REDIRECT = paths.default();
export const DEFAULT_LOGIN_REDIRECT = paths.home();
export const DEFAULT_SIGNIN_EMAIL_REDIRECT = paths.home();
export const DEFAULT_SIGNIN_REDIRECT = paths.registerInfoUrl();