const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

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

    // Save to Database
    try {
        await Contact.create({ name, email, subject, message });
    } catch (dbError) {
        console.error("Database Save Failed:", dbError);
        // Continue to send email even if DB fails? Or fail? 
        // usually better to continue or log it. 
        // For now, let's log it but NOT fail the request, as email is priority? 
        // User asked "persist", so maybe critical.
        // Let's non-blockingly save or block?
        // Blocking is safer for "transaction".
    }

    // Debug: Check which credentials are loaded
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const senderEmail = process.env.SENDER_EMAIL || process.env.EMAIL_USER;

    console.log("Debug Auth Check:");
    console.log("SMTP_HOST:", process.env.SMTP_HOST || "default");
    console.log("SMTP_PORT:", process.env.SMTP_PORT || "default (2525)");
    console.log("User Loaded:", smtpUser ? "YES" : "NO");
    console.log("Pass Loaded:", smtpPass ? "YES" : "NO");
    console.log("Sender Loaded:", senderEmail ? "YES" : "NO");

    try {
        if (!smtpUser || !smtpPass) {
            throw new Error("Missing SMTP Credentials. Please check Render Environment Variables.");
        }

        // Create Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
            port: process.env.SMTP_PORT || 2525,
            secure: false,
            auth: {
                user: process.env.SMTP_USER || process.env.EMAIL_USER,
                pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            },
            keepAlive: true,
            connectionTimeout: 10000,
            debug: true,
            logger: true
        });

        // Mail Options
        const mailOptions = {
            from: process.env.SENDER_EMAIL || process.env.EMAIL_USER, // Verified sender
            replyTo: email, // Reply to the visitor
            to: "aswinnc3@gmail.com",
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
            host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
            port: process.env.SMTP_PORT || 2525,
            secure: false,
            auth: {
                user: process.env.SMTP_USER || process.env.EMAIL_USER,
                pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            },
            keepAlive: true,
            connectionTimeout: 10000,
            debug: true,
            logger: true
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL || process.env.EMAIL_USER,
            replyTo: email,
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
