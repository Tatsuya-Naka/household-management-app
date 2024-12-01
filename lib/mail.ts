import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    // const confirmLink = `http://localhost:3000/new-user/email/new-verification?token=${token}`;
    const confirmLink = `https://household-management-im0osoy02-tatsuyas-projects-c707371c.vercel.app/new-user/email/new-verification?token=${token}`;
    
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to verify your email and sign up for the HMB - Household Management Book!</p>`
    });
}

export const sendVerificationResetPassword = async(email: string, token: string) => {
    const confirmLink = `http://localhost:3000/reset/password/verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${confirmLink}">here</a> to reset your password and log in with a new one!!</p>`
    })
}