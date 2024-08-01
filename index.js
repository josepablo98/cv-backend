const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { email, name, description } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  let mailOptions = {
    from: email,
    to: process.env.EMAIL_TO,
    subject: 'Nueva oferta de trabajo',
    text: `La persona ${name} con email ${email} ha enviado la siguiente oferta de trabajo:\n${description}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
      return res.status(500).json({ message: 'Error sending email. Talk to the admin' });
    }
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

app.listen(PORT);
console.log(`Server running on port ${PORT}`);