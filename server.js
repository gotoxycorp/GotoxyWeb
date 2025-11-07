const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Servir index.html y carpeta public
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Endpoint para enviar el email
app.post('/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log('📩 Datos recibidos del formulario:', req.body);

  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Falta RESEND_API_KEY en Render');
      return res.status(500).send('Error: falta API key');
    }

    // Enviar correo con Resend
    const data = await resend.emails.send({
      from: 'Gotoxy Contact <onboarding@resend.dev>', // no cambiar
      to: ['gotoxycorp@gmail.com'],
      subject: `Nuevo mensaje de ${name}`,
      text: `Email: ${email}\nTeléfono: ${phone || 'No proporcionado'}\n\nMensaje:\n${message}`,
    });

    console.log('✅ Correo enviado:', data);

    // Redirigir al index
    res.redirect('/index.html');
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error);
    res.status(500).send('Error al enviar el correo.');
  }
});

// Página principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
