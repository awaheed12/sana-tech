import express from "express";
import "dotenv/config";
import cors from "cors";
import nodemailer from "nodemailer";

const server = express();
const PORT = 3000;

server.use(express.json());
server.use(cors());

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "memongirach1@gmail.com",
    pass: "lovk uysr pmra rixg",
  },
});

server.post("/submit-form", async (req, res) => {
  const { firstName, email, subject, servicessetup, companybudget, message } = req.body;

  // Create email content
  const mailOptions = {
    from: "memongirach1@gmail.com",
    to: "recipient@example.com",
    subject: "New Form Submission",
    text: `
      Name: ${firstName}
      Email: ${email}
      Subject: ${subject}
      servicesSetup: ${servicessetup}
      companyBudget: ${companybudget}
      Message: ${message}
    `,
  };

  try {
    // Send email using Nodemailer
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

server.post("/send-email", (req, res) => {
  const { email } = req.body;

  // Email message options
  const mailOptions = {
    from: "memongirach1@gmail.com",
    to: "recipient@example.com",
    subject: "New Form Submission",
    text: `
      Email: ${email}
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

server.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
