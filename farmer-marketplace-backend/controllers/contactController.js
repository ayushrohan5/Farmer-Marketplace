const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");

// Configure transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or use host, port, secure for other services
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const saveContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to database
    const contact = await Contact.create({ name, email, message });
    // Send confirmation email
    await transporter.sendMail({
      from: `"Farmer Market" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting us!",
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for reaching out to us! We've received your message:</p>
        <blockquote>${message}</blockquote>
        <p>We'll get back to you shortly.</p>
        <br/>
        <p>Regards,<br/>Farmer Market Team</p>
      `,
    });

    res.status(200).json({ message: "Contact form submitted and email sent." });
  } catch (error) {
    console.error("Error in contact form submission:", error);
    res.status(500).json({ error: "Something went wrong. Try again later." });
  }
};


 module.exports = { saveContactMessage };