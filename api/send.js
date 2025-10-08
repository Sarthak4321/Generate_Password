import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const { email, password } = req.body;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    await transport.sendMail({
      from: `"PassWord Generator" <${process.env.EMAIL}>`,
      to: email,
      subject: "🎉 Your password is here",
      html: `<h2>Here is your password:</h2><p>${password}</p>`,
    });

    return res.status(200).send("Message sent successfully!");
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Error sending email");
  }
}