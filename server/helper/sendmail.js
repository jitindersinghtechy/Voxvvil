"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'milford8@ethereal.email',
        pass: 'ZvngpAAZ4JAgfAjYCE'
    }
});

exports.sendSignupEmail  = async (email) => {
    console.log(email)
    const mailOptions = {
        from: '"Your App 👻" <test@gmail>', // sender address
        to: email, // list of receivers
        subject: "Password Reset", // Subject line
        html: `
            <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
            <p>Please click the following link to reset your password:</p>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Password reset email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending password reset email:", error);
    }
}


exports.sendLoginEmail  = async (email) => {
    console.log(email)
    const mailOptions = {
        from: '"Your App 👻" <noreply@example.com>', // sender address
        to: email, // list of receivers
        subject: "Password Reset", // Subject line
        html: `
            <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
            <p>Please click the following link to reset your password:</p>
            <a href="http://your-app-url/reset-password?token=">Reset Password</a>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Password reset email sent: %s", info);
    } catch (error) {
        console.error("Error sending password reset email:", error);
    }
}
