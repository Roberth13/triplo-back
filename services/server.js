const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    secureConnection: false,
    port: 587,
    secure: false, // true for 465, false for other ports
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
      user: "roberth.ortiz@triplo.com.co", // generated ethereal user
      pass: "Triplo2022", // generated ethereal password
    },
});

async function send(to, subject, body_text, body_html){
    await transporter.sendMail({
        from: '"Admin Triplo" <roberth.ortiz@triplo.com.co>', 
        to: to, 
        subject: subject, 
        text: body_text, 
        html: body_html
    });
}

module.exports = {
    send
}
