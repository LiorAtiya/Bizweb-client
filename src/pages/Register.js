import React, { useRef, useState } from "react";
import * as Components from "../styles/StyledForm";
import ApiClient from "../api/ApiRoutes";
import { useTranslation } from "react-i18next";
import { sendOTP, verifyOTP } from "../api/firebase";

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
    setPhone(e.target.value);
    if (phone.length === 9) {
      setVerifyButton(true);
    } else {
      setVerifyButton(false);
    }
  };

  const handleClickSubmit = async (e) => {
    e.preventDefault();

    const user = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    if (verified) {
      ApiClient.register(user)
        .then((res) => {
          window.location.reload(false);
        })
        .catch();
    } else {
      alert("Please Verify Mobile");
    }
  };

  return (
    <Components.Form onSubmit={handleClickSubmit}>
      <Components.Title>{t("CreateAccount")}</Components.Title>
      <div id="recaptcha-container"></div>

      <Components.Input
        type="text"
        placeholder={t("Firstname")}
        required
        ref={firstname}
      />
      <Components.Input
        type="text"
        placeholder={t("Lastname")}
        required
        ref={lastname}
      />
      <Components.Input
        type="text"
        placeholder={t("Username")}
        required
        ref={username}
      />
      <div>
        <Components.Input
          type="number"
          placeholder={t("Phone")}
          required
          onChange={(e) => changeMobile(e)}
        />
        {verifyButton ? (
          <Components.Button
            type="button"
            onClick={() => sendOTP(setVerifyOtp, phone)}
          >
            {verified ? t("Verified") : t("Verify")}
          </Components.Button>
        ) : null}
      </div>

      {verifyOtp ? (
        <>
          <Components.Input
            type="number"
            placeholder={t("EnterOTP")}
            ref={otp}
          />
          <Components.Button
            type="button"
            value="OTP"
            onClick={() => verifyOTP(setVerifyOtp, setVerified, otp)}
          >
            Confirm
          </Components.Button>
        </>
      ) : null}

      <Components.Input
        type="email"
        placeholder={t("Email")}
        required
        ref={email}
      />
      <Components.Input
        type="password"
        placeholder={t("Password")}
        required
        ref={password}
      />

      <Components.Button type="submit">{t("Register")}</Components.Button>
    </Components.Form>
  );
}
