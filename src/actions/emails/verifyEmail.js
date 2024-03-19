"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload, options) => {
    try {
        const data = await resend.emails.send(payload, options);
        console.log("Email sent successfully");
        return data;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
