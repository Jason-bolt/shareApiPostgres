const nodemailer = require("nodemailer");

exports.sendConfirmatoryEmail = async (user) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "47dae9967e998c",
      pass: "5ca812cacaeff8",
    },
  });

  console.log(`User ######## ${user}`);
  const message = `
    <h1>Welcome to SHARE</h1>

    <p>
      Hello ${user.firstName} ${user.lastName}, we are glad to have you here.
    </p>
    <p>
      Start to share your amazing testimonies to encourage someone today!
    </p>
  `;

  try {
    let info = await transport.sendMail({
      from: "info@testimony.com", // sender address
      to: user.email, // list of receivers
      subject: "Registration confirmation", // Subject line
      text: "Hello world?", // plain text body
      html: message, // html body
    });
    return info;
  } catch (err) {
    return { error: err };
  }
};
