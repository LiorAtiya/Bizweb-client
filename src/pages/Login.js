import React, { useRef, useState } from "react";
import * as Components from '../components/StyledForm';
import Register from "./Register";
// import Hero from "../components/Hero";
import { useHistory } from "react-router-dom";
import axious from 'axios'
import '../styles/Form.css'

// import { loginCall } from "./apiCalls";
// import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const email = useRef();
  const password = useRef();

  // //isFetching - for loading
  // const {
  //   // user,
  //   // isFetching, 
  //   // error, 
  //   dispatch } = useContext(AuthContext)

  let history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    // //Send request to server to login
    // loginCall({ email: email.current.value, password: password.current.value }, dispatch);

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
        {/* <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type='text' placeholder='First Name' />
          <Components.Input type='text' placeholder='Last Name' />
          <Components.Input type='text' placeholder='Username' />
          <Components.Input type='number' placeholder='Phone' />
          <Components.Input type='email' placeholder='Email' ref={email}/>
          <Components.Input type='password' placeholder='Password' />
          <Components.Button>Register</Components.Button>
        </Components.Form> */}
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
  // return (
  //   <Hero hero="roomsHero">
  //     <div className="auth-wrapper">
  //       <form onSubmit={handleClick} className="auth-inner">
  //         <h3>Sign In</h3>

  //         <div className="mb-3">
  //           <label>Email address</label>
  //           <input
  //             type="email"
  //             className="form-control"
  //             placeholder="Enter email"
  //             required
  //             ref={email}
  //           />
  //         </div>

  //         <div className="mb-3">
  //           <label>Password</label>
  //           <input
  //             type="password"
  //             className="form-control"
  //             placeholder="Enter password"
  //             required
  //             ref={password}
  //           />
  //         </div>

  //         <div className="mb-3">
  //           <div className="custom-control custom-checkbox">
  //             <input
  //               type="checkbox"
  //               className="custom-control-input"
  //               id="customCheck1"
  //             />
  //             <label className="custom-control-label" htmlFor="customCheck1">
  //               Remember me
  //             </label>
  //           </div>
  //         </div>

  //         <div className="d-grid">
  //           <button type="submit" className="btn btn-primary">
  //             Submit
  //           </button>
  //         </div>
  //         <p className="forgot-password text-right">
  //           <a href="/register">Sign Up</a>
  //         </p>
  //       </form>
  //     </div>
  //   </Hero>
  // )
}