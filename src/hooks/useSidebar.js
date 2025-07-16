import { useState, useEffect } from "react";

export const useSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    useEffect(() => { 
        const root = document.documentElement;
        if (isCollapsed) {
            root.style.setProperty('--sidebar-margin', 'calc(54px + 6.3rem)');
        } else {
            root.style.setProperty('--sidebar-margin', 'calc(252px + 6.3rem)');
        }
    }, [isCollapsed]);

    return {isCollapsed, toggleSidebar};

}