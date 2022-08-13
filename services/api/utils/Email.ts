const nodemailer = require("nodemailer");

const send_email = async(subject: string, to: string, message: string): Promise<boolean> => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.STMP_PORT,
            secure: true,
            tls: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        const info = await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: to,
            subject: subject,
            text: message,
            html: message,
        });
        console.log("Message sent: %s", info.messageId);
        return (true);
    } catch(e) {
        console.error(e);
        return (false);
    }
}
export default {
    send_email,
}