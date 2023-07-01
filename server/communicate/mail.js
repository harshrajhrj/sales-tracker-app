const nodemailer = require('nodemailer');

/**
 * @class MailingService helps to transmit mails as per recipient
 */
class MailingService {
    static async Mail(recipient) {
        // Create a transporter object with your email service provider credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail', // e.g., 'gmail' or 'smtp.mailtrap.io'
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: 'aec.cse.harshraj@gmail.com',
            to: 'rajharsh.footballer@gmail.com',
            subject: 'Testing mail',
            text: 'Plain text body',
            html: '<h1>HTML body</h1>',
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent:', info.response);
                return 'MailSent';
            }
        });
    }
}

module.exports = MailingService;