import "./Login.css"
import "../../api/auth.js"
import { useGoogleLogin } from '@react-oauth/google';
import { loginWithGoogleCode } from "../../api/auth.js";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../../api/isTokenValid.js"
import { useEffect, useState } from "react";
import { CircularProgress, LinearProgress } from '@mui/material';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking'); // 'checking', 'ready', 'error'
  const [serverProgress, setServerProgress] = useState(0);
  const [currentAttempt, setCurrentAttempt] = useState(0);

 
  const checkServerStatus = async () => {
    const maxAttempts = 30; 
    const interval = 2000; 
    let attempts = 0;

    const checkServer = async () => {
      attempts++;
      setCurrentAttempt(attempts);
      
      const progress = (attempts / maxAttempts) * 100;
      setServerProgress(progress);

      try {
        const isValid = await isTokenValid();
        if (!isValid) {
          setServerProgress(100);
          setServerStatus('ready');
          return
        }
      } catch (error) {
        console.log(`Intento ${attempts}/${maxAttempts}: Error de conexión`);
      }

      if (attempts < maxAttempts) {
        setTimeout(checkServer, interval);
      } else {
        setServerProgress(100);
        setServerStatus('ready');
      }
    };

    checkServer();
  };

  useEffect(() => {
    checkServerStatus();
  }, []);

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
          disabled={isLoading || serverStatus !== 'ready'}
        >
          <i className="fab fa-google"></i>
          Continue with Google
        </button>
        <div className="footer">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </div>
        
        {serverStatus === 'checking' && (
          <div className="server-status">
            <div className="bar-container">
              <LinearProgress 
                variant="determinate" 
                value={serverProgress}
              />
              <span style={{ fontSize: '12px', color: '#666' }}>
                {Math.round(serverProgress)}%
              </span>
            </div>
            <p>Connecting to server... </p>
          </div>
        )}
        
        {serverStatus === 'ready' && (
          <div className="server-status" style={{ color: 'green', fontSize: '14px' }}>
            ✓ Server ready
          </div>
        )}
      </div>
      
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <CircularProgress />
            <h2>Loading...</h2>
            <p>Connecting to the server...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login