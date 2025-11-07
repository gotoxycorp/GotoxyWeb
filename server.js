const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Servir tanto el index como los archivos públicos
app.use(express.static(__dirname)); // sirve index.html
app.use(express.static(__dirname + '/public')); // sirve tu carpeta public

app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para enviar el correo
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

    // Redirige de nuevo a la página principal (index.html)
    res.redirect('/index.html');
  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
    res.status(500).send('Error al enviar el correo.');
  }
});

// Ruta base (inicio)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
