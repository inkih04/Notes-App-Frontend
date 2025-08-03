import SideBar from '../sideBar/SideBar';
import { useSidebar } from '../../hooks/useSidebar';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import "./SidebarLayout.css";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

const SidebarLayout = ({ children}) => { 
    const { isCollapsed, toggleSidebar} = useSidebar();
    const isMobile = useMediaQuery('(max-width:950px)');
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleMobileSidebar = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    return (
        <>
            {isMobile && (
                <div className="mobile-navbar">
                    <div className="navbar-left">
                        <IconButton 
                            onClick={toggleMobileSidebar} 
                            className="sidebar-toggle-btn"
                            size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                        <h1 className="app-title">Notes</h1>
                    </div>
                </div>
            )}

            <div className="sidebar-layout">
                <SideBar 
                    onToggle={toggleSidebar} 
                    isCollapsed={isCollapsed}
                    isMobileOpen={isMobileOpen}
                    onMobileToggle={toggleMobileSidebar}
                />
                <div className={`sidebar-content-wrapper ${isMobile ? 'mobile' : ''}`}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default SidebarLayout;