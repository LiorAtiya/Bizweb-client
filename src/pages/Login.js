import React, { useRef, useState } from "react";
import * as Components from '../styles/StyledForm';
import Register from "./Register";
import { useHistory } from "react-router-dom";
import axious from 'axios'

export default function Login() {
  const email = useRef();
  const password = useRef();

  let history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    await axious.post("http://localhost:5015/api/auth/login",
      { email: email.current.value, password: password.current.value })
      .then((res) => {
        if (res.status !== 200) {
          window.localStorage.setItem("token", JSON.stringify(res.data));
          history.push("/")
          window.location.reload(false);
        } else {
          alert("Wrong email or password");
        }
      })
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