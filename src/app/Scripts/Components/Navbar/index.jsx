import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useNavigate, Link } from "react-router-dom";
import './index.css'; 

function Navbar() {
    const navigate = useNavigate();
    const overlayRef = useRef(null);

    const handleLogOut = () => {
        sessionStorage.removeItem('user-info');
        sessionStorage.removeItem('user-creds');
        navigate("/");
    };

    const handleGoToHome = () => {
        navigate("/general/home");
    };

    const handleGoToAbout = () => {
        navigate("/general/about");
    };

    const handleGoToProfile = () => {
        navigate("/general/profile");
    };

    const handleGoToSettings = () => {
        navigate("/general/settings");
    };

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: handleGoToHome
        },
        {
            label: 'About',
            icon: 'pi pi-info-circle',
            command: handleGoToAbout
        },
    ];

    const ProfileMenuItems = [
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: handleGoToProfile
        },
        {   
            label: 'Settings',
            icon: 'pi pi-cog',
            command: handleGoToSettings
        }, 
        {
            label: 'Log out',
            icon: 'pi pi-sign-out',
            command: handleLogOut
        }
    ];

    const end = (
        <div className="flex align-items-center gap-2">
            <span className="text">Task&Master</span>
            {/*<InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" /> */}
        </div>
    );

    const imgProfile = (
        <Avatar image="https://cdn-icons-png.freepik.com/512/64/64572.png" shape="circle" onClick={(e) => overlayRef.current.toggle(e)} />
    )

    return (
        <div className="navbar-container">
            <Menubar model={items} start={imgProfile} end={end} />
            <OverlayPanel ref={overlayRef}>
                <Menu model={ProfileMenuItems} />
            </OverlayPanel>
        </div>
    )
}

export default Navbar;
