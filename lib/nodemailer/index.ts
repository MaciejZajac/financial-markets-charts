import nodemailer from 'nodemailer';
import { NEWS_SUMMARY_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from './templates';
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
    }
});

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace('{{intro}}', intro);

    const mailOptions = {
        from: '"Signalist"',
        to: email,
        subject: `Welcome to Signalist`,
        text: 'Thanks for joining',
        html: htmlTemplate
    }

    await transporter.sendMail(mailOptions);
};


export const sendNewsSummaryEmail = async ({ email, date, newsContent }: { email: string; date: string; newsContent: string }) => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE.replace('{{date}}', date).replace('{{newsContent}}', newsContent);

    const mailOptions = {
        from: '"Signalist" <maciej.zajac.197@gmail.com>',
        to: email,
        subject: `Market news summary today - ${date}`,
        text: 'Thanks for joining',
        html: htmlTemplate
    }

    await transporter.sendMail(mailOptions);
}