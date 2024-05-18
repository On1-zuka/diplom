const nodemailer = require('nodemailer');
const ApiError = require('../error/ApiError');

class EmailController {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'myhobbya75@gmail.com',
        pass: 'ssjfrmjvyxhsdroh',
      },
    });

    this.sendEmailAdmin = this.sendEmailAdmin.bind(this);
    this.sendEmailUser = this.sendEmailUser.bind(this);
  }

  async sendEmailAdmin(req, res, next) {
    const { subject, text } = req.body;
    const mailOptions = {
      from: 'myhobbya75@gmail.com',
      to: 'myhobbya75@gmail.com',
      subject,
      text,
    };

    this.transporter.sendMail(mailOptions)
      .then(() => res.status(200).send('Email sent successfully'))
      .catch((error) => {
        console.error(error);
        next(ApiError.internal('Error sending email'));
      });
  }

  async sendEmailUser(req, res, next) {
    const { to, subject, text } = req.body;
    const mailOptions = {
      from: 'myhobbya75@gmail.com',
      to,
      subject,
      text,
    };

    this.transporter.sendMail(mailOptions)
      .then(() => res.status(200).send('Email sent successfully'))
      .catch((error) => {
        console.error(error);
        next(ApiError.internal('Error sending email'));
      });
  }
}

module.exports = new EmailController();