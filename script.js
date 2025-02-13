const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ellaipeterson@gmail.com',
        pass: 'Ep513140!!!'
    }
});

app.post('/send-email', (req, res) => {
    const { email, notes, image } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your Notes and Drawing',
        text: `Here are the notes you took:\n\n${notes}`,
        attachments: [
            {
                filename: 'drawing.jpg',
                content: image.split('base64,')[1],
                encoding: 'base64'
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
        res.json({ success: true, info });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

fetch('http://ellapetersony.github.io', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
        notes: notes,
        image: dataURL
    })
})
