const express = require('express')
const dotenv = require('dotenv')
const twilio = require('./Twilio')


const app = express();
const PORT = 3001;

dotenv.config();

app.get('/test', (req, res) => {
    res.send('Welcome to twilio');
})

app.get('/login', async (req,res) => {
    console.log('logging in')
    const data = await twilio.sendVerifyAsync('+91 93539 61459', 'sms')
    res.send(data)
})

app.get('/verify', async (req,res) => {
    console.log('Verifying code')
    const data = await twilio.verifyCodeAsync('+91 93539 61459', req.query.code)
    return data
})


app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`)
})