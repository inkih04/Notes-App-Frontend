import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { acceptInvitation } from '../api/acceptInvitation';
import "../components/login/Login.css"
import { useGoogleLogin } from '@react-oauth/google';
import { loginWithGoogleCode } from "../api/auth.js";


export default function AcceptInvitationPage() {
    const { token } = useParams();
    const navigate = useNavigate();

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        const tokenGoogle = await loginWithGoogleCode(codeResponse.code);
        sessionStorage.setItem("tokenRefresh", tokenGoogle.refresh);
        sessionStorage.setItem("tokenAccess", tokenGoogle.access);
        sessionStorage.setItem("userUsername", tokenGoogle.profile.username);
        sessionStorage.setItem("userEmail", tokenGoogle.profile.email);
        sessionStorage.setItem("userBio", tokenGoogle.profile.bio);
        sessionStorage.setItem("userProfilePicture", tokenGoogle.picture);  
        const response = await acceptInvitation(token);
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
