import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { refreshToken } from "../../api/refereshToken";

function SideBar({ onToggle }) { 
    const username = sessionStorage.getItem("userUsername");
    const email = sessionStorage.getItem("userEmail");
    const profilePicture = sessionStorage.getItem("userProfilePicture");
    const memoizedProfilePicture = useMemo(() => profilePicture, [profilePicture]);
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    }

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        if (onToggle) {
            onToggle(!isCollapsed);
        }
    }

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-go-back">
                <button className="material-icons" onClick={toggleSidebar}>
                    {isCollapsed ? 'arrow_forward' : 'arrow_back'}
                </button>
            </div>

            <div className="sidebar-content">
                <div className="sidebar-profile">
                    <div className="sidebar-profile-image">
                        <img onError={(e) => e.target.src = 'https://www.w3schools.com/howto/img_avatar.png'} className="profile-image" src={memoizedProfilePicture} alt="Profile Picture" />
                    </div>
                    <span className="sidebar-profile-username">{username}</span>
                    <span className="sidebar-profile-email">{email}</span>
                    <div className="sidebar-stats">
                        <div className="sidebar-stats-separator"></div>
                        <div className="sidebar-stats-separator"></div>
                    </div>
                </div>

                <div className="sidebar-links">
                    <div className="links">
                        <button className="links-button" onClick={() => {refreshToken();  navigate("/Notebooks");}}>
                            <span className="material-icons">menu_book</span>
                            <p> Notebooks</p>
                        </button>
                        <button className="links-button" onClick={() => {refreshToken();  navigate("/Note/Favourite");}}>
                            <span className="material-icons">star</span>
                            <p> Important Notes</p>
                        </button>                    
                        <button className="links-button" onClick={() => {refreshToken();  navigate("/Note/Closed");}}>
                            <span className="material-icons">lock</span>
                            <p> Closed Notes </p>
                        </button>
                    </div>
                    <div className="sidebar-links-logout">
                        <button className="links-button" onClick={handleLogout}>
                            <span className="material-icons"> logout</span>
                            <p>Logout</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar;