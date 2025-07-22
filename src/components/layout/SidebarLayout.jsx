import SideBar from '../sideBar/SideBar';
import { useSidebar } from '../../hooks/useSidebar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import "./SidebarLayout.css";
import { useNavigate } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import StarIcon from '@mui/icons-material/Star';
import LockIcon from '@mui/icons-material/Lock';
import { refreshToken } from '../../api/refereshToken';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const SidebarLayout = ({ children}) => { 
    const { isCollapsed, toggleSidebar} = useSidebar();
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:950px)');

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    }

     const handleNavChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                refreshToken();
                navigate("/Note/Closed");
                break;
            case 1:
                refreshToken();
                navigate("/Note/Favourite");
                break;
            case 2:
                refreshToken();
                navigate("/Notebooks");
                break;
            case 3:
                handleLogout();
                break;
            default:
                break;
        }
    };



    return (
        <>
            <div className="sidebar-layout">
                <SideBar onToggle={toggleSidebar} />
                <div className={`sidebar-content-wrapper`}>
                    {children}
                </div>
            </div>

            {isMobile && (
                <BottomNavigation
                    className='bottom-layout'
                    showLabels
                    value={value}
                    onChange={handleNavChange}
                >
                    <BottomNavigationAction label="Closed" icon={<LockIcon />} />
                    <BottomNavigationAction label="Favorites" icon={<StarIcon />} />
                    <BottomNavigationAction label="Notebooks" icon={<LibraryBooksIcon />} />
                    <BottomNavigationAction label="Logout" icon={<ExitToAppIcon />} />
                </BottomNavigation>
            )}
        </>
    );
};

export default SidebarLayout;