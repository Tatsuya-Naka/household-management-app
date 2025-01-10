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
    recordsPageUrl() {
        return "/records";
    },
    newRecordPageUrl() {
        return "/register/new-record";
    },
    communityPageUrl() {
        return "/community";
    },
    settingPageUrl() {
        return "/setting";
    },
    logOutPageUrl() {
        return "/log-out";
    },
    newRecordConfirmUrl() {
        return "/register/confirm";
    },
    newRecordCancelUrl() {
        return "/server/new-record/cancel";
    },
    dashboardFetchUrl() {
        return "/server/dashboard/fetch/type";
    },
    recordsIncomeFectchUrl() {
        return "/server/records/income";
    },
    recordsExpensesFetchUrl() {
        return "/server/records/expenses";
    },
    recordsSavingsFetchUrl() {
        return "/server/records/savings";
    },
    recordEditPageUrl() {
        return "/records/income/edit";
    },
    recordExpensesEditPage() {
        return "/records/expenses/edit";
    },
    recordsIncomeUrl() {
        return "/records/income";
    },
    recordsExpensesUrl() {
        return "/records/expenses";
    },
    recordsSavingsUrl() {
        return "/records/savings";
    },
    recordsListsPageUrl() {
        return "/records/lists";
    },
    recordsListsAppliedPageUrl() {
        return "/records/lists/applied";
    },
    recordsListsProcessingPageUrl() {
        return "/records/lists/processing";
    }
}

export default paths;