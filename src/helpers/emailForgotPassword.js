const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
})

exports.sendEmail = (email, name) => {
  return new Promise((resolve, reject) => {
    const message = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: 'example email',
      html:
      `<html>

      <head>
          <title>Forget Password</title>
      </head>
      
      <body>
          <div>
              <h3>Dear ${name},</h3>
              <p>You requested for a password reset, kindly use this <a href="http://localhost:8080/createnewpassword">link</a> to reset your password</p>
              <br>
              <p>Cheers!</p>
          </div>
         
      </body>
      
      </html>`
    }
    transporter.sendMail(message, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve(info)
      }
    })
  })
}
