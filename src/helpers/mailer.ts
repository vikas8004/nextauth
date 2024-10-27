import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, eamiltype, userId }: any) => {
    try {
        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (eamiltype === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }, { new: true })
        }
        else if (eamiltype === "RESET") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }, { new: true })
        }

        // nodemailer setup
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "da8f3c37eaaba8",
                pass: "5a0881d52ae2fb"
            }
        });
        const mailOptions = {
            from: "vikas@gamil.com",
            to: email,
            subject: eamiltype === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${eamiltype === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }
        const sentMail = await transport.sendMail(mailOptions)
        console.log(sentMail);

    } catch (error: any) {
        throw new Error(error.message);

    }
}