const express = require('express');
const cors = require('cors');
require('dotenv').config();
const initRouter = require('./src/routes')
const post = process.env.POST;
require('./connection_database')

console.log("tesst git")
const app = express();
app.use(cors({
    origin: process.env.CLIENTURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
//CRUD
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Router
initRouter(app)
// app.use('/', (req, res) => {
//     return res.send("hello world 123")
// })

app.listen(post, () => {
    // console.log("vcl")
})