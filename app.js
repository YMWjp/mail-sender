const express = require("express");
const nodemailer = require("nodemailer");
const csvParser = require("csv-parser");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(express.json());

app.post("/send-mails", (req, res) => {
  const { subject, message } = req.body;

  let recipients = [];

  fs.createReadStream("recipients.csv")
    .pipe(csvParser())
    .on("data", (row) => {
      recipients.push(row.email);
    })
    .on("end", () => {
      sendMails(recipients, subject, message);
      res.send({ status: "Emails sent!" });
    });
});

function sendMails(recipients, subject, message) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your_email@gmail.com",
      pass: "your_password",
    },
  });

  let mailOptions = {
    from: "your_email@example.com",
    to: recipients.join(","),
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Emails sent: " + info.response);
    }
  });
}

app.listen(port, () => {
  console.log(`Mail sender app running at http://localhost:${port}`);
});
