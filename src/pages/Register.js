import React, {useRef, useState } from "react";
import app from '../database/firebase_config'
import * as Components from '../components/StyledForm';
import '../styles/Form.css'

import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "firebase/auth";
import axios from "axios";
// import { useHistory } from "react-router-dom";

const auth = getAuth(app)

export default function Register() {
  const firstname = useRef();
  const lastname = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  // const history = useHistory();

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
      try {
        await axios.post("http://localhost:5015/api/auth/register",user);
        // history.push('/login');
        window.location.reload(false);
      }catch(err){
        console.log(err);
      }
    } else {
      alert("Please Verify Mobile");
    }
  }

  return (
    <Components.Form onSubmit={handleClick}>
      <Components.Title>Create Account</Components.Title>
      <div id="recaptcha-container"></div>

      <Components.Input type='text' placeholder='First Name' 
          required
          ref={firstname}
      />
      <Components.Input type='text' placeholder='Last Name' 
          required
          ref={lastname}
      />
      <Components.Input type='text' placeholder='Username' 
          required
          ref={username}
      />

<div>
      <Components.Input type='number' placeholder='Phone' 
          required
          onChange={(e) => changeMobile(e)}
      />
        {verifyButton? 
        <Components.Button 
        type="button" 
        onClick={onSignInSubmit} 
        >
         {verified? "Verified" : "Verify"} 
        </Components.Button>
        : null}
      </div>

      {verifyOtp? 
      <>
        <Components.Input
          type="number"
          placeholder="Enter OTP"
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

      <Components.Input type='email' placeholder='Email'
          required
          ref={email}
      />
      <Components.Input type='password' placeholder='Password' 
          required
          ref={password}
      />

      <Components.Button type="submit">Register</Components.Button>
    </Components.Form>
  )

  // return (
  //   <div className="auth-wrapper">
  //   <form onSubmit={handleClick} className="auth-inner">
  //     <h3>Sign Up</h3>
  //     <div id="recaptcha-container"></div>

  //     <div className="mb-3">
  //       <label>First name</label>
  //       <input
  //         type="text"
  //         className="form-control"
  //         placeholder="First name"
  //         required
  //         ref={firstname}
  //       />
  //     </div>

  //     <div className="mb-3">
  //       <label>Last name</label>
  //       <input
  //         type="text"
  //         className="form-control"
  //         placeholder="Last name"
  //         required
  //         ref={lastname}
  //       />
  //     </div>

  //     <div className="mb-3">
  //       <label>Username</label>
  //       <input
  //         type="text"
  //         className="form-control"
  //         placeholder="Username"
  //         required
  //         ref={username}
  //       />
  //     </div>

  //     <div className="mb-3">
  //       <label>Mobile</label>
  //       <input
  //         type="number"
  //         className="form-control"
  //         placeholder="Enter mobile"
  //         onChange={(e) => changeMobile(e)}
  //       />
  //       {verifyButton? 
  //       <input 
  //       type="button" 
  //       value={verified? "Verified" : "Verify"}
  //       onClick={onSignInSubmit} 
  //       style={{backgroundColor:"#0163d2",width:"100%",padding:8, color:"white", border:"none"}}/>
  //       : null}
  //     </div>
      
  //     {verifyOtp? 
  //     <div className="mb-3">
  //       <label>OTP</label>
  //       <input
  //         type="number"
  //         className="form-control"
  //         placeholder="Enter OTP"
  //         ref={otp}
  //         // onChange={(e) => setOtp({ otp: e.target.value })}
  //       />
  //       <input 
  //       type="button" 
  //       value="OTP" 
  //       onClick={verifyCode} 
  //       style={{backgroundColor:"#0163d2",width:"100%",padding:8, color:"white", border:"none"}}/>

  //     </div>: null}

  //     <div className="mb-3">
  //       <label>Email address</label>
  //       <input
  //         type="email"
  //         className="form-control"
  //         placeholder="Enter email"
  //         required
  //         ref={email}
  //       />
  //     </div>

  //     <div className="mb-3">
  //       <label>Password</label>
  //       <input
  //         type="password"
  //         className="form-control"
  //         placeholder="Enter password"
  //         required
  //         ref={password}
  //       />
  //     </div>

  //     <div className="d-grid">
  //       <button type="submit" className="btn btn-primary">
  //         Sign Up
  //       </button>
  //     </div>
  //     <p className="forgot-password text-right">
  //       Already registered <a href="/login">sign in?</a>
  //     </p>
  //   </form>
  //   </div>
  // );
}


// export default class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fname: "",
//       lname: "",
//       email: "",
//       password: "",
//       verifyButton: false,
//       verifyOtp: false,
//       otp: "",
//       verified: false,
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.onSignInSubmit = this.onSignInSubmit.bind(this);
//     this.verifyCode = this.verifyCode.bind(this);
//   }

//   onCaptchVerify() {
//     const auth = getAuth();
//     window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//       'size': 'invisible',
//       'callback': (response) => {
//         this.onSignInSubmit();
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         // ...
//       },
//     }, auth);
//   }

//   onSignInSubmit() {
//     this.onCaptchVerify()
//     const phoneNumber = "+972" + this.state.mobile;
//     const appVerifier = window.recaptchaVerifier;

//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//     .then((confirmationResult) => {
//       // SMS sent. Prompt user to type the code from the message, then sign the
//       // user in with confirmationResult.confirm(code).
//       window.confirmationResult = confirmationResult;
//       alert("otp sended")
//       this.setState({ verifyOtp: true});
//     }).catch((error) => {
//       // Error; SMS not sent
//       // ...
//     });
//   }

//   verifyCode() {
//     window.confirmationResult.confirm(this.state.otp).then((result) => {
//       // User signed in successfully.
//       const user = result.user;
//       console.log(user);
//       alert("Verification Done")
//       this.setState({verified: true, verifyOtp: false})
//     }).catch((error) => {
//       alert("Invalid Otp")
//     });
//   }

//   changeMobile(e){
//     this.setState({ mobile: e.target.value }, function (){
//       if(this.state.mobile.length === 10) {
//         this.setState({
//           verifyButton: true,
//         })
//       }
//     })
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     if(this.state.verified) {
//       const { fname, lname, email, password } = this.state;
//       console.log(fname, lname, email, password);
//       fetch("http://localhost:5015/api/auth/register", {
//         method: "POST",
//         crossDomain: true,
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//           fname,
//           email,
//           lname,
//           password,
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data, "userRegister");
//         });
//     } else {
//       alert("Please Verify Mobile")
//     }
//   }
//   render() {
//     return (
//       <div className="auth-wrapper">
//       <form onSubmit={this.handleSubmit} className="auth-inner">
//         <h3>Sign Up</h3>
//         <div id="recaptcha-container"></div>

//         <div className="mb-3">
//           <label>Mobile</label>
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Enter mobile"
//             onChange={(e) => this.changeMobile(e)}
//           />
//           {this.state.verifyButton? <input 
//           type="button" 
//           value={this.state.verified? "Verified" : "Verify"}
//           onClick={this.onSignInSubmit} 
//           style={{backgroundColor:"#0163d2",width:"100%",padding:8, color:"white", border:"none"}}/>
//           : null}
//         </div>
        
//         {this.state.verifyOtp? 
//         <div className="mb-3">
//           <label>OTP</label>
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Enter OTP"
//             onChange={(e) => this.setState({ otp: e.target.value })}
//           />
//           <input 
//           type="button" 
//           value="OTP" 
//           onClick={this.verifyCode} 
//           style={{backgroundColor:"#0163d2",width:"100%",padding:8, color:"white", border:"none"}}/>

//         </div>: null}

//         <div className="mb-3">
//           <label>Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter email"
//             onChange={(e) => this.setState({ email: e.target.value })}
//           />
//         </div>

//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter password"
//             onChange={(e) => this.setState({ password: e.target.value })}
//           />
//         </div>

//         <div className="d-grid">
//           <button type="submit" className="btn btn-primary">
//             Sign Up
//           </button>
//         </div>
//         <p className="forgot-password text-right">
//           Already registered <a href="/login">sign in?</a>
//         </p>
//       </form>
//       </div>
//     );
//   }
// }
