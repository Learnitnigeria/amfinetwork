const sgMail = require('@sendgrid/mail')
const {SENDGRID_API_KEY, EMAIL_SENDER} = process.env
 
exports.sendMail =  async({receiver, message, subject}) => {
    console.log(receiver, message, subject, EMAIL_SENDER)
    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
    to: receiver, 
    from: EMAIL_SENDER, 
    subject: subject,
    html: message,
    }
    return sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}

  

  
