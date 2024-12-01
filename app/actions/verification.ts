"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import paths from "@/paths";
import { resetPasswordSchema } from "@/schemas/resetPassword";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

interface VerificationState {
    errors: {
        _form?: string[];
    },
    success?: {
        isSuccess: boolean;
        message: string[]
    }
};

export interface ResetPasswordVerificationState {
    errors: {
        email?: string[];
        confirm?: string[];
        _form?: string[];
    },
    success?: {
        isSuccess?: boolean;
        message?: string[];
    },
};

export async function verification(token: string): Promise<VerificationState> {
    if (!token) {
        return {
            errors: {
                _form: ["Invalid Access"]
            }
        }
    }

    const verificationToken = await getVerificationTokenByToken(token);
    if (!verificationToken) {
        return {
            errors: {
                _form: ["Invalid Access"]
            }
        };
    }

    const hasExpired = new Date(verificationToken.expires) < new Date();

    if (hasExpired) {
        return {
            errors: {
                _form: ["Token has been expired!"]
            }
        }
    }

    const existingUser = await getUserByEmail(verificationToken.email);

    if (!existingUser) {
        return {
            errors: {
                _form: ["User does not exist!"]
            }
        }
    }

    try {
        await db.user.update({
            where: {
                id: existingUser.id,
            },
            data: {
                emailVerified: new Date(),
                email: verificationToken.email,
            }
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            };
        } else {
            return {
                errors: {
                    _form: ["Something wrong!"]
                }
            };
        }
    }

    try {
        await db.verificationToken.delete({
            where: {
                id: verificationToken.id,
            }
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            };
        } else {
            return {
                errors: {
                    _form: ["Something wrong!"]
                }
            };
        }
    }

    return {
        errors: {},
        success: {
            isSuccess: true,
            message: ["Email verified"]
        }
    };
}

export async function resetPasswordVerification(token: string | null, formState: ResetPasswordVerificationState, formData: FormData): Promise<ResetPasswordVerificationState> {
    const validatedFields = resetPasswordSchema.safeParse({
        password: formData.get("password"),
        confirm: formData.get("confirm"),
    });

    if (!validatedFields || !validatedFields.data) {
        return {
            errors: {
                _form: ["Write valid passwords"]
            }
        };
    }

    const { password } = validatedFields.data;

    if (!token) {
        return {
            errors: {
                _form: ["Invalid access"]
            }
        };
    }

    const verificationToken = await getVerificationTokenByToken(token);

    if (!verificationToken) {
        return {
            errors: {
                _form: ["Invalid access!"]
            }
        }
    }

    const hasExpired = new Date(verificationToken.expires) < new Date();

    if (hasExpired) {
        return {
            errors: {
                _form: ["Token has been expired!"]
            }
        };
    }

    const existingUser = await getUserByEmail(verificationToken.email);

    if (!existingUser) {
        return {
            errors: {
                _form: ["User does not exist!"]
            }
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.user.update({
            where: { id: existingUser.id },
            data: {
                password: hashedPassword,
            }
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ["Something wrong"]
                }
            };
        }
    }

    try {
        await db.verificationToken.delete({
            where: {
                id: verificationToken.id
            }
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            };
        } else {
            return {
                errors: {
                    _form: ["Something wrong"]
                }
            };
        }
    }

    redirect(paths.resetPasswordSuccessUrl());

    return {
        errors: {},
        success: {
            isSuccess: true,
            message: ["Successfully reset password!"]
        }
    }
}