import nodemailer from  "nodemailer";

async function SendEmail(to,subject,html) {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: process.env.emailSender,
          pass: process.env.passSender,
        },
      });
    const info = await transporter.sendMail({
      from: `mailto:<${process.env.emailSender}>`,
      to, // list of receivers
      subject, // Subject line
      html, // html body
    });
  
   
  }
export default SendEmail;
