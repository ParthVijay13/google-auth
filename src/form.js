import  { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider} from '@react-oauth/google';
import {  GoogleLogin } from '@react-oauth/google';
import  axios  from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post("http://localhost:3000/", {
        email: email,
        password: password,
      });
  
      // Clear the form fields
      setEmail("");
      setPassword("");
  
      // Clear the form fields in the UI
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
  
      // Redirect the user to the homepage or another page
      window.location.href = "/";
    } catch (error) {
      console.error("Error during login:", error);
  
      // Display a more user-friendly error message
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit} action="POST">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>or</h2>
      <div className='google-auth'>
      <GoogleOAuthProvider clientId="416100393732-u4ha5qcupp4a7dkeughs512938bujrr1.apps.googleusercontent.com"> 
        <GoogleLogin
          onSuccess={credentialResponse => {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log(decoded);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
      </div>
      
    </div>
  );
};

export default LoginForm;