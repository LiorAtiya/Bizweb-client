import React, {useRef, useState } from "react";
import app from '../api/firebase_config'
import * as Components from '../styles/StyledForm';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import axios from "axios";
import ApiClient from "../api/ApiRoutes";
import { useTranslation } from 'react-i18next';

const auth = getAuth(app)

export default function Register() {
  const firstname = useRef();
  const lastname = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();

  const { t } = useTranslation();

  const otp = useRef();
  const [phone, setPhone] = useState("");
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [verifyButton, setVerifyButton] = useState(false);
  const [verified, setVerified] = useState(false);

  const changeMobile = (e) => {
    console.log(phone.length)
    setPhone(e.target.value);
    if(phone.length === 9) {
      setVerifyButton(true);
    }else{
      setVerifyButton(false);
    }
  }

  const onCaptchVerify = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        this.onSignInSubmit();
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
    }, auth);
  }

  //send otp code to confirm number phone
  const onSignInSubmit = () => {
    onCaptchVerify();
    const phoneNumber = "+972" + phone;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      alert("otp sended")
      setVerifyOtp(true);
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });
  }
  
  const verifyCode = () => {
    window.confirmationResult.confirm(otp.current.value).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user);
      alert("Verification Done")
      setVerified(true);
      setVerifyOtp(false);
    }).catch((error) => {
      alert("Invalid Otp")
    });
  }

  const handleClick = async (e) => {
    e.preventDefault();

    const user = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    if(verified) {

      ApiClient.register(user)
      .then(res => {
        console.log(res)
        window.location.reload(false);
      })
      .catch(error => console.error(error))
      
    } else {
      alert("Please Verify Mobile");
    }
  }

  return (
    <Components.Form onSubmit={handleClick}>
      <Components.Title>{t('CreateAccount')}</Components.Title>
      <div id="recaptcha-container"></div>

      <Components.Input type='text' placeholder={t('Firstname')} 
          required
          ref={firstname}
      />
      <Components.Input type='text' placeholder={t('Lastname')} 
          required
          ref={lastname}
      />
      <Components.Input type='text' placeholder={t('Username')} 
          required
          ref={username}
      />

<div>
      <Components.Input type='number' placeholder={t('Phone')} 
          required
          onChange={(e) => changeMobile(e)}
      />
        {verifyButton? 
        <Components.Button 
        type="button" 
        onClick={onSignInSubmit} 
        >
         {verified? t('Verified') : t('Verify')} 
        </Components.Button>
        : null}
      </div>

      {verifyOtp? 
      <>
        <Components.Input
          type="number"
          placeholder={t('EnterOTP')}
          ref={otp}
        />
        <Components.Button
        type="button" 
        value="OTP" 
        onClick={verifyCode} 
        >
          Confirm
        </Components.Button>
        </>
        : 
        null}

      <Components.Input type='email' placeholder={t('Email')}
          required
          ref={email}
      />
      <Components.Input type='password' placeholder={t('Password')} 
          required
          ref={password}
      />

      <Components.Button type="submit">{t('Register')}</Components.Button>
    </Components.Form>
  )
}
