const express = require('express')
const dotenv = require('dotenv')
const twilio = require('./Twilio')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const PORT = 3001;

app.use(bodyParser.json())
app.use(cors())
dotenv.config();

app.get('/test', (req, res) => {
    res.send('Welcome to twilio');
})

app.post('/login', async (req,res) => {
    console.log('logging in')
    const {to, username, channel} = req.body
    const data = await twilio.sendVerifyAsync(to, channel)
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