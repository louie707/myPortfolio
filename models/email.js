const nodemailer = require('nodemailer');
const sanitizeHTML = require('sanitize-html')

class Email {
    constructor(emailData) {
        this.emailData = emailData;
        this.errors = [];

    }

    cleanUp() {
        if(typeof(this.emailData.senderEmail) !== "string"){this.emailData.senderEmail = ""}
        if(typeof(this.emailData.senderName) !== "string"){this.emailData.senderName = ""}
        if(typeof(this.emailData.messageSubject) !== "string"){this.emailData.messageSubject = ""}
        if(typeof(this.emailData.senderMessage) !== "string"){this.emailData.senderMessage = ""}

        this.emailData = {
            senderName: sanitizeHTML(this.emailData.senderName.trim(), {allowedTags: [], allowedAttributes: {}}),
            senderEmail: sanitizeHTML(this.emailData.senderEmail.trim(), {allowedTags: [], allowedAttributes: {}}),
            messageSubject: sanitizeHTML(this.emailData.messageSubject.trim(), {allowedTags: [], allowedAttributes: {}}),
            senderMessage: sanitizeHTML(this.emailData.senderMessage.trim(), {allowedTags: [], allowedAttributes: {}})
        }
    }

    validate() {
        if(this.emailData.sendEmail == "") this.errors.push("Please Enter a email")
        if(this.emailData.senderName == "") this.errors.push("Please Enter a name")
        if(this.emailData.messageSubject == "") this.errors.push("Please Enter a subject")
        if(this.emailData.senderMessage == "") this.errors.push("Message field required")
    }
    
    sendEmail() {
        return new Promise((resolve, reject) => {
            this.cleanUp();
            this.validate();
            console.log(this.emailData)
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                })
                const msg = {
                    from: this.emailData.senderEmail,
                    to: 'louiejayme707@gmail.com',     
                    subject: this.emailData.messageSubject,
                    text: this.emailData.senderMessage,
                    html: `Sender Name: <strong>${this.emailData.senderName}</strong><br>
                            Email: <strong>${this.emailData.senderEmail}</strong>
                            <br><br> ${this.emailData.senderMessage}`
                };
                if(!this.errors.length) {
                    transporter.sendMail(msg)
                    .then(response => {
                        resolve("Email sent")
                    })
                    .catch(err => {
                        reject(this.errors)
                    })
                } else {
                    reject(this.errors)
                }
                
        })
    }
}

module.exports = Email