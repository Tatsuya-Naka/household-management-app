"use server";

export interface LoginState {
    errors: {
        email?: string[];
        password?: string[];
        _form?: string[];
    },
    success?: {
        isSuccess?: boolean;
        message?: string[];
    }
};



export async function login(formState: LoginState, formData: FormData): Promise<LoginState> {
    console.log(formState.success);
    console.log(formData.get("email"));
    return {
        errors: {},
        success: {
            isSuccess: true,
            message: ["Successfully logged in!"]
        },
    };
}