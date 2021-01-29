const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const twilio = require("./Twilio");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
const jwt = require("./utils/Jwt");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);
  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });
});

const PORT = 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/test", (req, res) => {
  res.send("Welcome to twilio");
});

app.post("/login", async (req, res) => {
  console.log("logging in");
  const { to, username, channel } = req.body;
  const data = await twilio.sendVerifyAsync(to, channel);
  res.send(data);
});

app.post("/verify", async (req, res) => {
  console.log("Verifying code");
  const { to, code, username } = req.body;
  const data = await twilio.verifyCodeAsync(to, code);
  if (data.status === "approved") {
    const token = jwt.createJwt(username, process.env.JWT_SECRET);
    return res.send({ token });
  }
  res.status(401).send({ token });
});

app.post("/call-new", (req, res) => {
  console.log("receive a new call");
  io.emit("call-new", { data: req.body });
  const response = twilio.voiceResponse("Thank you for your call Bomma Bomma");
  res.type("text/xml");
  res.send(response.toString());
});

app.post("/call-status-changed", (req, res) => {
  console.log("Call status changed");
  res.send("ok");
});

app.post("/enqueue", (req, res) => {
  const response = twilio.enqueueCall("Customer Service");
  console.log('enqueuing call')
  io.emit("enqueue", { data: req.body });
  res.type("text/xml");
  res.send(response.toString());
});

server.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});
