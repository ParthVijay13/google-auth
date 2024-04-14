
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/login", {
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
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during login:", error);
      alert("Invalid email or password. Please try again.");
    }
  };

  function generateUniqueUserID() {
    const currentTime = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return currentTime + '-' + randomNumber;
  };
  
  const handleOAuthLogin = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("This is the decoded data ", decoded);

    try {
      await axios.post("http://localhost:3000/oauth", {
        userID: generateUniqueUserID(),
        email: decoded.email,
        email_verified: decoded.email_verified,
        exp: decoded.exp,
        family_name: decoded.family_name,
        given_name: decoded.given_name,
        name: decoded.name,
        picture: decoded.picture,
        sub: decoded.sub
      });
      console.log("Data is posted from here!");
    } catch (error) {
      console.error("Error during OAuth login:", error);
      alert("OAuth login failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login Form</h2>
      <form onSubmit={handleLoginSubmit} action="POST">
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
            onSuccess={handleOAuthLogin}
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
  