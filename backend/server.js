const express = require('express')
const dotenv = require('dotenv')
const app = express();
const PORT = 3001;


dotenv.config();

app.get('/test', (req, res) => {
    res.send('Welcome to twilio');
})

app.get('/login', (req,res) => {
    console.log('logging in')
})

app.get('/verify', (req,res) => {
    console.log('Verifying code')
})


app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`)
})