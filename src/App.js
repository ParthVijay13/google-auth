
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import LoginForm from './form';
import { jwtDecode } from "jwt-decode";
function App() {
  return (
    <div className="App">

      <LoginForm />
      

      
    </div>
  );
}

export default App;
