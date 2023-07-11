import React, { useRef } from "react";
import ApiClient from "../api/ApiRoutes";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

export function ResetPassword() {
  const { id, token } = useParams()
  const password = useRef();
  const confirmPassword = useRef()
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.current.value === confirmPassword.current.value) {
      ApiClient.ResetPassword(id, token, password.current.value)
        .then((res) => {
          alert('Password updated')
          history.push("/login")
        })
        .catch(error =>
          alert('Link expired, try again')
        );
    } else {
      alert('Password doesn\'t match')
    }
  }


  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h1>Reset Password</h1>
        <form action="" method="post" onSubmit={handleSubmit}>

          <input className='w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200'
            type="password"
            name="password"
            id="password"
            placeholder="Enter new password"
            required
            ref={password}
          />
          <br />

          <input className='w-1/2 px-4 py-2 mt-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200'
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm password"
            ref={confirmPassword}
          />

          <br />
          <input className='flex items-center px-4 py-2 m-auto mt-3 space-x-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
            type="submit"
            value="submit"

          />

        </form>
      </div>
    </div>

  )
}
