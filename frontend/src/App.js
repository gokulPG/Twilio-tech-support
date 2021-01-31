import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import { useImmer } from "use-immer";
import axios from "./utils/Axios";
import socket from "./utils/SocketIo";
import CallCenter from "./components/CallCenter";
import useTokenFromLocalStorage from "./hooks/useTokenFromLocalStorage";
import * as Twilio from "twilio-client";

function App() {
  const [calls, setCalls] = useImmer({
    calls: [],
  });

  const [user, setUser] = useImmer({
    username: "",
    mobileNumber: "",
    verificationCode: "",
    verificationSent: false,
  });

  const [twilioToken, setTwilioToken] = useState();
  const [storedToken, setStoredToken, isValidToken] = useTokenFromLocalStorage(
    null
  );

  useEffect(() => {
    if (isValidToken) {
      return socket.addToken(storedToken);
    }
    socket.removeToken();
  }, [isValidToken, storedToken]);

  useEffect(() => {
    if (twilioToken) {
      connectTwilioVoiceClient(twilioToken);
    }
  }, [twilioToken]);

  useEffect(() => {
    socket.client.on("connect", () => {
      console.log("socket connection is established from FE");
    });
    socket.client.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.client.on("twilio-token", (data) => {
      setTwilioToken(data.token);
    });
    socket.client.on("call-new", ({ data: { CallSid, CallStatus } }) => {
      setCalls((draft) => {
        const index = draft.calls.findIndex((call) => call.CallSid === CallSid);
        if (index === -1) {
          draft.calls.push({ CallSid, CallStatus });
        }
      });
    });
    socket.client.on("enqueue", ({ data: { CallSid } }) => {
      setCalls((draft) => {
        const index = draft.calls.findIndex(
          ({ CallSid }) => CallSid === CallSid
        );
        if(index === -1) {
          return;
        }
        draft.calls[index].CallStatus = "enqueue";
      });
    });
    return () => {};
  }, [socket.client]);

  async function sendSmsCode() {
    await axios.post("/login", {
      to: user.mobileNumber,
      username: user.username,
      channel: "sms",
    });

    setUser((draft) => {
      draft.verificationSent = true;
    });
  }

  async function sendVerificationCode() {
    console.log("Sending Verification");
    const response = await axios.post("/verify", {
      to: user.mobileNumber,
      code: user.verificationCode,
      username: user.username,
    });
    console.log("verification response", response.data.token);
    setStoredToken(response.data.token);
  }

  function connectTwilioVoiceClient(twilioToken) {
    const device = new Twilio.Device(twilioToken, { debug: true });
    device.on("error", (error) => {
      console.log(error);
    });
    device.on("incoming", (connection) => {
      console.log("Incoming from twilio");
      connection.accept();
    });
  }

  console.log(isValidToken, "isValidToken");
  return (
    <div>
      {isValidToken ? (
        <CallCenter calls={calls} />
      ) : (
        <>
          <Login
            user={user}
            setUser={setUser}
            sendSmsCode={sendSmsCode}
            sendVerificationCode={sendVerificationCode}
          />
        </>
      )}
    </div>
  );
}

export default App;
