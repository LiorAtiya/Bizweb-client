import React, { useRef, useState } from "react";
import * as Components from "../styles/StyledForm";
import Register from "./Register";
import { useHistory } from "react-router-dom";
import ApiClient from "../api/ApiRoutes";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useTranslation } from "react-i18next";
import ForgotPassword from "./ForgotPassword";

export function Login() {
  const email = useRef();
  const password = useRef();
  const [isForgot, setIsForgot] = useState(false);

  let history = useHistory();

  const { t } = useTranslation();

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    ApiClient.login(email.current.value, password.current.value)
      .then((response) => {
        localStorage.setItem("token", `Bearer ${response.data.accessToken}`);
        const token = localStorage.getItem("token");

        ApiClient.getUserInfo(token)
          .then((response) => {
            localStorage.setItem("user-info", JSON.stringify(response.data));

            alert("Login was successful");

            history.push("/");
            window.location.reload(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => alert("Wrong email or password"));
  };

  const handleFastLogin = (data) => {
    localStorage.setItem("token", `Bearer ${data}`);
    const token = localStorage.getItem("token");

    ApiClient.fastLogin(token)
      .then((res) => {
        localStorage.setItem("user-info", JSON.stringify(res.data));

        history.push("/");
        window.location.reload(false);
      })
      .catch((error) => console.error(error));
  };

  const [signIn, toggle] = useState(true);
  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Register />
      </Components.SignUpContainer>

      {isForgot ? (
        <ForgotPassword />
      ) : (
        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleEmailLogin}>
            <Components.Title>{t("Login")}</Components.Title>
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
            <Components.Anchor
              className="cursor-pointer"
              onClick={() => setIsForgot(true)}
            >
              {t("ForgotPassword")}
            </Components.Anchor>
            <Components.Button type="submit">{t("Login")}</Components.Button>
            <br></br>

            <LoginSocialFacebook
              appId={process.env.REACT_APP_FB_APP_ID}
              onResolve={(response) => {
                handleFastLogin(response.data.accessToken);
              }}
              onReject={(error) => {
                console.log(error);
              }}
            >
              <FacebookLoginButton style={{ fontSize: "15px" }} />
            </LoginSocialFacebook>

            <LoginSocialGoogle
              typeResponse="idToken"
              client_id={process.env.REACT_APP_GG_APP_ID}
              onResolve={(response) => {
                handleFastLogin(response.data.credential);
              }}
              onReject={(error) => {
                console.log(error);
              }}
            >
              <GoogleLoginButton style={{ fontSize: "15px" }} />
            </LoginSocialGoogle>
          </Components.Form>
        </Components.SignInContainer>
      )}

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>{t("WelcomeBack")}</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              {t("Login")}
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>{t("HelloFriend")}</Components.Title>
            <Components.Paragraph>
              Enter Your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              {t("Register")}
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}
