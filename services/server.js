const nodemailer = require("nodemailer");
const fs = require("fs");

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "roberth.ortiz@outlook.com", // generated ethereal user
      pass: "Roberth13", // generated ethereal password
    },
    tls: {
        ciphers:'SSLv3'
    }
});
// let transporter = nodemailer.createTransport({
//     host: "outlook.office365.com",
//     secureConnection: false,
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "info@triplo.com.co", // generated ethereal user
//       pass: "Triplo2022", // generated ethereal password
//     },
//     tls: {
//         ciphers:'SSLv3'
//     }
// });

async function send(to, subject, body_text, body_html){
    try {
        const path = require('path');
        console.log(path.join(__dirname, '../testing.pdf'));
        await transporter.sendMail({
            from: '"Triplo" <roberth.ortiz@outlook.com>', 
            to: to, 
            subject: subject, 
            text: body_text, 
            attachments:[
                {
                    filename: "testing.pdf",
                    path: path.join(__dirname, '../testing.pdf'),
                }
            ],
            html: `<html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email</title>
            </head>
            <body>
                <div>
                    <p>Aquí va todo el contenido del correo...</p>
                </div>
            </body>
            </html>`
        });
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
    send
}
