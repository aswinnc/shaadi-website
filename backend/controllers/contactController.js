const nodemailer = require("nodemailer");

exports.sendContactEmail = async (req, res) => {
    const { contactData } = req.body;
    if (!contactData) {
        return res.status(400).json({ error: "Missing contact data" });
    }
    const { name, email, subject, message } = contactData;

    // Validate request
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Create Transporter
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            connectionTimeout: 10000,
            debug: true,
            logger: true
        });

        // Mail Options
        const mailOptions = {
            from: email, // Sender address (user's email from form)
            to: "aswinnc3@gmail.com", // Recipient address (FIXED)
            subject: `New Contact Form Submission: ${subject}`,
            html: `
        <h3>New Message from Shaadi Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email (Detailed):", {
            message: error.message,
            code: error.code,
            command: error.command,
            stack: error.stack,
            fullError: JSON.stringify(error)
        });
        res.status(500).json({ error: "Failed to send email", details: error.message });
    }
};

exports.subscribeNewsletter = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            connectionTimeout: 10000,
            debug: true,
            logger: true
        });

        const mailOptions = {
            from: email,
            to: "aswinnc3@gmail.com",
            subject: "New Newsletter Subscriber",
            html: `
        <h3>New Subscriber</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p>A new user has subscribed to the newsletter.</p>
      `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Subscription successful" });
    } catch (error) {
        console.error("Error sending subscription email:", error);
        res.status(500).json({ error: "Failed to subscribe" });
    }
};
