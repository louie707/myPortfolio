const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const router = require('./router')

const app = express();
let port = process.env.PORT
if(port == null || port == "") {
    port = 3000
}
app.use(express.urlencoded({extended: false}))
app.use(express.json())

let sessionOntions = session({
    secret: "I watch",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

app.use(sessionOntions)
app.use(flash())

app.use((req, res, next) => {
    res.locals.errors = req.flash("errors")
    res.locals.success = req.flash("success")

    next();
})

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.static('assets'))

app.use('/', router)

app.listen(port)