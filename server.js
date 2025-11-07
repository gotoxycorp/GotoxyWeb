const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // ahora sirve tu index.html directamente

app.post('/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: 'gotoxycorp@gmail.com',
      subject: `Nuevo mensaje de ${name}`,
      text: `Teléfono: ${phone || 'No proporcionado'}\n\nMensaje:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Correo enviado correctamente');

    res.redirect('/'); // vuelve a index.html
  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
    res.send('Error al enviar el correo.');
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
