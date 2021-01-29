import React, { useEffect } from "react";
import Login from "./components/Login";
import { useImmer } from "use-immer";
import axios from "./utils/Axios";
import socket from "./utils/SocketIo";
import useLocalStorage from "./hooks/useLocalStorage";
import CallCenter from "./components/CallCenter";

function App() {
  const [calls, setCalls] = useImmer({
    calls: []
  })

  const [user, setUser] = useImmer({
    username: "",
    mobileNumber: "",
    verificationCode: "",
    verificationSent: false,
  });

  const [storedToken, setStoredToken] = useLocalStorage("token", null);

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    socket.on('call-new', (data) => {
      setCalls((draft) => {
        draft.calls.push(data)
      })
    })
    return () => {};
  }, []);

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

  return (
    <div>
      {storedToken ? (
        <CallCenter />
      ) : (
        <Login
          user={user}
          setUser={setUser}
          sendSmsCode={sendSmsCode}
          sendVerificationCode={sendVerificationCode}
        />
      )}
      {calls.calls.map((call) => <h1>{call.data.CallSid}</h1>)}
    </div>
  );
}

export default App;
