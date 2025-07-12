import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SideBar() {
    const username = sessionStorage.getItem("userUsername");
    const email = sessionStorage.getItem("userEmail");
    const profilePicture = sessionStorage.getItem("userProfilePicture");
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    }

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
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
                        <img className="profile-image" src={profilePicture} alt="Profile Picture" />
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
                        <button className="links-button" onClick={() => navigate("/Notebooks")}>
                            <span className="material-icons">menu_book</span>
                            <p> Notebooks</p>
                        </button>
                        <button className="links-button" onClick={() => navigate("/Notebooks")}>
                            <span className="material-icons">star</span>
                            <p> Important Notes</p>
                        </button>                    
                        <button className="links-button" onClick={() => navigate("/Notebooks")}>
                            <span className="material-icons">lock</span>
                            <p> Clossed Notes </p>
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