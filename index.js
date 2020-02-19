// import express, {urlencoded, json, static} from "express";
// import router from './router';

const express = require('express')
const router = require('./router')

const app = express();
let port = process.env.PORT
if(port == null || port == "") {
    port = 3000
}
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.static('assets'))

app.use('/', router)

app.listen(port)