const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "fabiansm4@gmail.com",
                pass: "jctukecsgudqstiv"
            }
        })
        await transporter.sendMail({
            from: "noreplyinfosystems@gmail.com",
            to: email,
            subject: subject,
            text: text
        })
        console.log("email sent successfully");
        return true
    } catch (error) {
        console.log("email not sent");
        console.log(error);
        return error
    }
}