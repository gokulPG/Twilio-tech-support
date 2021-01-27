const express = require('express')
const app = express();
const PORT = 3001;

app.get('/test', (req, res) => {
    res.send('Welcome to twilio');
})

app.get('/login', (req,res) => {
    console.log('logging in')
})

app.get('/verify', (req,res) => {
    console.log('Verifying code')
})

console.log(process.env.MOBILE)

app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`)
})