import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + (60 * 60 * 1000)
            })
        } else if (emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + (60 * 60 * 1000)
            })
        }

        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAPUSERNAME,
              pass: process.env.MAILTRAPPASSWORD
            }
        });
        
        const mailOptions = {
            from: 'ecommercedock@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password!",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below into your browser. <br /> ${process.env.domain}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}


