import "./Login.css"
import "../../api/auth.js"
import { useGoogleLogin } from '@react-oauth/google';
import { loginWithGoogleCode } from "../../api/auth.js";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../../api/isTokenValid.js"
import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isTokenValid();
  }, [])

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      setIsLoading(true); 
      try {
        const token = await loginWithGoogleCode(codeResponse.code);
        sessionStorage.setItem("tokenRefresh", token.refresh);
        sessionStorage.setItem("tokenAccess", token.access);
        sessionStorage.setItem("userUsername", token.profile.username);
        sessionStorage.setItem("userEmail", token.profile.email);
        sessionStorage.setItem("userBio", token.profile.bio);
        sessionStorage.setItem("userProfilePicture", token.picture);  
        navigate("/Notebooks");
      }
      catch (error) {
        console.error("Login failed:", error);
        setIsLoading(false); 
      }
    },
    onError: (errorResponse) => {
      console.error("Login failed:", errorResponse);
      setIsLoading(false);
    }
  })

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Notes</h1>
        <h2>Sign In</h2>
        <button 
          className="social-btn" 
          onClick={() => login()}
          disabled={isLoading}
        >
          <i className="fab fa-google"></i>
          Continue with Google
        </button>
        <div className="footer">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <CircularProgress />
            <h2>Loading...</h2>
            <p>Conecting to the server...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login