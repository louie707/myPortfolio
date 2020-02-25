const Email = require('../models/email')

exports.sendEmail = (req, res) => {
    const emailData = new Email(req.body)
    emailData.sendEmail()
    .then(result => {
        req.flash("success", result);
        req.session.save(() => res.redirect("/"));
    })
    .catch(() => {
        req.flash("errors", emailData.errors)
        req.session.save(() => res.redirect("/"));    
    });
}