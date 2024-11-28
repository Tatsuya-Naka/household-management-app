"use server";

export interface SignInState {
    errors: {
        email?: string[];
        password?: string[];
        confirm?: string[];
        name?: string[];
        currency?: string[];
        location?: string[];
        _form?: string[];
    },
    success?: {
        isSuccess?: boolean;
        message?: string[];
    }
};

export async function signin(formState: SignInState, formData: FormData): Promise<SignInState> {
    console.log(formData.get("email"));
    console.log(formState);
    return {
        errors: {},
        success: {
            isSuccess: true,
            message: ["Successfully Sign-in!!"]
        }
    };
}