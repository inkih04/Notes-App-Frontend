import SideBar from '../sideBar/SideBar';
import { useSidebar } from '../../hooks/useSidebar';
import "./SidebarLayout.css";

const SidebarLayout = ({ children}) => { 
    const { isCollapsed, toggleSidebar } = useSidebar();

    return (
        <div className="sidebar-layout">
            <SideBar onToggle={toggleSidebar} />
            <div className={`sidebar-content-wrapper`}>
                {children}
            </div>
        </div>
    );
};

export default SidebarLayout;