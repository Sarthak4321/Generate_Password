// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import nodemailer from 'nodemailer';
// import Ami from './src/Ami'
// import { html } from "framer-motion/client";
// import App from "./src/App"

// const app = express();
// // app.use(bodyParser.json());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true })); /.*


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "dist"))); // serve React build folder

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });


// app.post("/send", async (req, res) => {
//   try {

//     const transport = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASS,
//       }
//     });




//     await transport.sendFile({
//       from: `"PassWord Generator" <${process.env.EMAIL}>`,
//       to: email,
//       subject: "🎉 Your password is here"
//   html: `<h2> Here is your password <h2/> ${PassWord}`,
//     });

//     res.status(200);
//   }catch (err) {
//     console.error("Error:", err);
//   };
// });


// app.listen(5000, () => {
//   console.log("Server running at http://localhost:5000 ");
// });

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import 'dotenv/config'


const app = express();
app.use(express.json()); // enable JSON parsing
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist"))); // serve React build folder

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/send", async (req, res) => {
  try {
    const { email, password } = req.body; // extract from frontend

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

    res.status(200).send("Massage send Succesfully");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error sending email ❌");
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000 ");
});