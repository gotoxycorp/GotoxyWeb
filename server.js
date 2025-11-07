const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // tu carpeta con el HTML

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'contacto@gotoxyweb.com', // o el que uses, puede ser inventado
      to: 'gotoxycorp@gmail.com', // correo donde querés recibirlo
      subject: `Nuevo mensaje de ${name}`,
      text: `Email: ${email}\nTeléfono: ${phone || 'No proporcionado'}\n\nMensaje:\n${message}`,
    });

    console.log('Correo enviado:', data);
  res.redirect('/'); // vuelve al inicio de tu sitio

  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).send('Error al enviar el correo.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
