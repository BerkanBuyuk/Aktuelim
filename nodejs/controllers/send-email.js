import "dotenv/config";
import nodemailer from "nodemailer";

//POST MAIL
export const postMail = (req, res) => {
  // Kullanıcıdan gelen verileri al
  const { isimSoyisim, mail, aciklama } = req.body;

  // E-posta gönderme işlemi
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `${mail}`,
    to: process.env.MAIL_USER,
    subject: "Müşteri Maili",
    text: `${isimSoyisim}\nMail: ${mail}\nAçıklama: ${aciklama}`,
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
