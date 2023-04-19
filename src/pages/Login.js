import React, { useRef, useState } from "react";
import * as Components from '../styles/StyledForm';
import Register from "./Register";
import { useHistory } from "react-router-dom";
import ApiClient from "../api/ApiRoutes";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";

export default function Login() {
  const email = useRef();
  const password = useRef();

  let history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    ApiClient.login(email.current.value, password.current.value)
      .then((res) => {
        if (res.status !== 200) {
          window.localStorage.setItem("token", JSON.stringify(res.data));
          history.push("/")
          window.location.reload(false);
        } else {
          alert("Wrong email or password");
        }
      })
      .catch(error => console.error(error));
  }

  const handleFacebookLogin = (data) => {
    const user = {
      firstname: data.first_name,
      lastname: data.last_name,
      username: "user"+ Math.floor(Date.now() + Math.random()),
      email: data.email,
    }

    ApiClient.fastLogin(user)
      .then((res) => {
        window.localStorage.setItem("token", JSON.stringify(res.data));
        history.push("/")
        window.location.reload(false);
      })
      .catch(error => console.error(error));
  }

  const handleGoogleLogin = (data) => {

    const user = {
      firstname: data.given_name,
      lastname: data.family_name,
      username: "user"+ Math.floor(Date.now() + Math.random()),
      email: data.picture,
    }

    ApiClient.fastLogin(user)
      .then((res) => {
        console.log(res)
        window.localStorage.setItem("token", JSON.stringify(res.data));
        history.push("/")
        window.location.reload(false);
      })
      .catch(error => console.error(error));
  }

  const [signIn, toggle] = useState(true);
  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Register />
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleClick}>
          <Components.Title>Login</Components.Title>
          <Components.Input type='email' placeholder='Email'
            required
            ref={email}
          />
          <Components.Input type='password' placeholder='Password'
            required
            ref={password}
          />
          <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
          <Components.Button type="submit">Login</Components.Button>
          <br></br>

          <LoginSocialFacebook
            appId={process.env.REACT_APP_FB_APP_ID}
            onResolve={(response) => {
              handleFacebookLogin(response.data)
            }}
            onReject={(error) => {
              console.log(error);
            }}
          >
            <FacebookLoginButton style={{ fontSize: '15px' }} />
          </LoginSocialFacebook>

          <LoginSocialGoogle
            client_id={process.env.REACT_APP_GG_APP_ID}
            onResolve={(response) => {
              handleGoogleLogin(response.data)
            }}
            onReject={(error) => {
              console.log(error);
            }}
          >
            <GoogleLoginButton style={{ fontSize: '15px' }} />
          </LoginSocialGoogle >
        </Components.Form>

      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>

          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Login
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter Your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Register
            </Components.GhostButton>
          </Components.RightOverlayPanel>

        </Components.Overlay>
      </Components.OverlayContainer>

    </Components.Container>
  )
}