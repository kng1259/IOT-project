/* eslint-disable no-console */
import nodemailer from 'nodemailer'

export const sendMail = (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        // from: process.env.EMAIL_USER,
        from: 'bot@example.org',
        to: email,
        subject: subject,
        html: html
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}
