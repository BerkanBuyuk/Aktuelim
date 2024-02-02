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
    from: req.body.mail,
    to: process.env.MAIL_USER,
    subject: "Müşteri Maili",
    text: `${nameSurname}\nMail: ${mail}\nAçıklama: ${explanation}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("E-posta gönderildi: " + info.response);
      res.status(200).send("E-posta gönderildi");
    }
  });
};
