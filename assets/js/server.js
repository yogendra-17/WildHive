const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
const cors = require('cors');
// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.urlencoded({ extended: true }));

async function setupTransporter() {
    let testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'crystel.wehner87@ethereal.email',
            pass: 'wsba9g8RpGwgNbF69d'
        }
    });
}

setupTransporter().then(transporter => {
    app.post('/subscribe', (req, res) => {
        const { name, email } = req.body;
        if (!email) {
            return res.status(400).send('Email address is required');
        }
        // Email content
        const mailOptions = {
            from: 'yuvimittal2004@gmail.com',
            to: email,
            subject: 'Subscription Confirmation',
            text: `Dear ${name},\n\nThank you for subscribing to our newsletter!`
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error:', error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent:', info.response);
                res.status(200).send('Email sent successfully');
            }
        });
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Error setting up transporter:', error);
});
