import "dotenv/config";
import nodemailer from "nodemailer";

//POST MAIL
export const postMail = (req, res) => {
  const { nameSurname, mail, explanation } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,
    subject: "Müşteri Maili",
    text: `İsim Soyisim: ${nameSurname}\nMail: ${mail}\nAçıklama:\n${explanation}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Hata oluştu");
    } else {
      res.status(200).send("E-posta gönderildi");
    }
  });
};
