import nodemailer from "nodemailer";
import { MAILTRAP_USER, MAILTRAP_PASS, VERIFICATION_EMAIL, SIGN_IN_LINK } from "./variables";
import { generateTemplate } from "#/mail/template";
import path from "path";

interface Profile {
    name: string;
    email: string;
    userId: string;


}
const generateMailTransporter = () => {
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: MAILTRAP_USER,
            pass: MAILTRAP_PASS
        }
    });
    return transport;
}
export const sendVerificationMail = async (token: string, profile: Profile) => {
    const { name, email } = profile;
    const welcomeMessage = `Hi ${name}! Use the given OTP to verify your email address.`;
    const transport = generateMailTransporter();
    transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        subject: "Welcome to my app",
        html: generateTemplate({
            title: "Welcome to Podify",
            message: welcomeMessage,
            logo: "cid:logo",
            banner: "cid:welcome",
            link: "#",
            btnTitle: token
        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/logo.png"),
                cid: "logo"
            },
            {
                filename: "welcome.png",
                path: path.join(__dirname, "../mail/welcome.png"),
                cid: "welcome"
            }
        ]
    })
}

interface Option {
    email: string;
    link: string;
}

export const sendPasswordResetLink = async (option: Option) => {
    const { email, link } = option;

    const message = `Click the link below to reset your password. If you didn't request a password reset, you can ignore this email.`;
    const transport = generateMailTransporter();
    transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        subject: "Welcome to my app",
        html: generateTemplate({
            title: "Reset your password",
            message,
            logo: "cid:logo",
            banner: "cid:forget_password",
            link,
            btnTitle: "Reset password",
        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/logo.png"),
                cid: "logo"
            },
            {
                filename: "forget_password.png",
                path: path.join(__dirname, "../mail/forget_password.png"),
                cid: "forget_password"
            }
        ]
    })
}

export const sendPassResetSuccessMail = async (name: string, email: string) => {
    const message = `Dear ${name}, Your password has been reset successfully. If you didn't request a password reset, please contact us.`;

    const transport = generateMailTransporter();
    transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        subject: "Password reset successful",
        html: generateTemplate({
            title: "Password reset successful",
            message,
            logo: "cid:logo",
            banner: "cid:forget_password",
            link: SIGN_IN_LINK,
            btnTitle: "Sign in",
        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/logo.png"),
                cid: "logo"
            },
            {
                filename: "forget_password.png",
                path: path.join(__dirname, "../mail/forget_password.png"),
                cid: "forget_password"
            }
        ]
    })
}