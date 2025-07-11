import "./Login.css"
import "../../api/auth.js"
import { useGoogleLogin } from '@react-oauth/google';
import { loginWithGoogleCode } from "../../api/auth.js";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        const token = await loginWithGoogleCode(codeResponse.code);
        sessionStorage.setItem("tokenRefresh", token.refresh);
        sessionStorage.setItem("tokenAccess", token.access);
        sessionStorage.setItem("userUsername", token.profile.username);
        sessionStorage.setItem("userEmail", token.profile.email);
        sessionStorage.setItem("userBio", token.profile.bio);
        //todo: profile picture url

        navigate("/Notebooks");

      }
      catch (error) {
        console.error("Login failed:", error);
      }
    },
    onError: (errorResponse) => {
      console.error("Login failed:", errorResponse);
    }
  })

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Notes</h1>
        <h2>Sign In</h2>
        <button className="social-btn" onClick={() => login()} >
          <i className="fab fa-google"></i>
          Continue with Google
        </button>
        <div className="footer">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  )
}

export default Login