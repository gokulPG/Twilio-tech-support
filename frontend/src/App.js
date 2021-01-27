import React from "react";
import Login from "./components/Login";
import { useImmer } from "use-immer";
import axios from "./utils/Axios";

function App() {
  const [user, setUser] = useImmer({
    username: "",
    mobileNumber: "",
    verificationCode: "",
    verificationSent: false,
  });

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
    });
    console.log('verification response', response.data)
  }

  return (
    <div>
      <Login user={user} setUser={setUser} sendSmsCode={sendSmsCode} sendVerificationCode={sendVerificationCode} />
    </div>
  );
}

export default App;
