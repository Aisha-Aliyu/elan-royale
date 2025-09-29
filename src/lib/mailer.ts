import nodemailer from "nodemailer";
import process from "process";

export const sendConfirmationEmail = async (to: string, reservationId: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"ELÁN ROYALE" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Reservation Confirmation - ELÁN ROYALE",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #d4af37;">✨ Reservation Confirmed!</h2>
        <p>Thank you for booking with <b>Élan Royale</b>.</p>
        <p>Your reservation ID is: <b>${reservationId}</b></p>
        <p>We look forward to welcoming you in luxury.</p>
        <br />
        <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};