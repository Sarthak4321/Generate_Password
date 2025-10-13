import nodemailer from "nodemailer";
import SuccessPopup from "./SuccessPopup";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    await transport.sendMail({
      from: `"Password Generator" <${process.env.EMAIL}>`,
      to: email,
      subject: "🎉 Your Generated Password",
      html: `<h2>Your generated password:</h2><p><b>${password}</b></p>`,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ message: "Email failed", error: err.message });
  }
}