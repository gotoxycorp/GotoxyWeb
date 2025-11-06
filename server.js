const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // carpeta con tu HTML

app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    console.log(req.body); // 🔹 verifica que llegan los datos

    // Configuración del transporte (aquí pones tu correo y App Password)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gotoxycorp@gmail.com',    // ← TU correo
            pass: 'nwim ncll mhsn qqzt'        // ← TU App Password de Gmail
        }
    });

    // Configuración del correo
    let mailOptions = {
        from: email,                  // quien llena el formulario
        to: 'lucila.romeo03@gmail.com',     // ← a dónde quieres recibirlo (puede ser tu mismo correo)
        subject: `Nuevo mensaje de ${name}`,
        text: `Teléfono: ${phone || 'No proporcionado'}\n\nMensaje:\n${message}`
    };

    // Enviar correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error al enviar el correo.');
        } else {
            console.log('Correo enviado:', info.response);
            res.send('Correo enviado correctamente!');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
