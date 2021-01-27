import React from 'react'
import Login from './components/Login'
import {useImmer} from 'use-immer'
import axios from './utils/Axios'

function App() {

  const [user, setUser] = useImmer({
    username: '',
    mobileNumber:'',
    verificationCode: '',
    verificationSent: false
  })

  async function sendSmsCode() {
    await axios.post('/login', {
      to: user.mobileNumber,
      username: user.username,
      channel: 'sms'
    });

    setUser((draft) => {
      draft.verificationSent = true;
    })
  }

  return (
    <div>
        <Login user={user} setUser={setUser} sendSmsCode={sendSmsCode} />
    </div>
  );
}

export default App;
