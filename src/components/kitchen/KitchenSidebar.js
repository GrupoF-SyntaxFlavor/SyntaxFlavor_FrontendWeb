import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';

export default function KitchenSidebar() {
    const start = (
        <div className="navbar-left">
            <div className="logo-container">
                <img alt="logo" src='https://images.pond5.com/pixel-sushi-vector-illustration-isolated-illustration-155825087_iconm.jpeg' className="logo" />
            </div>
            <span className="navbar-title">Gestión de la Cocina</span> {/* Título de la gestión de cocina */}
        </div>
    );

    const end = (
        <div className="navbar-right">
            <i className="pi pi-search p-mr-4"></i> {/* Ícono de búsqueda */}
            <i className="pi pi-bell p-mr-4"></i>   {/* Ícono de notificaciones */}
            <div className="user-profile">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="user" className="profile-pic" />
                <span>Gene Russell</span>  {/* Nombre del usuario */}
                <i className="pi pi-angle-down p-ml-2"></i>  {/* Ícono de menú desplegable */}
            </div>
        </div>
    );

    return (
        <div className="layout">
            {/* Navbar */}
            <Menubar start={start} end={end} className="navbar" />
            
            <div className="main-content">
                {/* Sidebar */}
                <div className="sidebar"> 

                    <div className="sidebar-items">
                        <div className="sidebar-item">
                            <Button icon="pi pi-home" className="p-button-text p-button-plain p-button-lg" />
                            <span>Dashboards</span>
                        </div>

                        <div className="sidebar-item">
                            <Button icon="pi pi-star" className="p-button-text p-button-plain p-button-lg" />
                            <span>UI Kit</span>
                        </div>

                        <div className="sidebar-item">
                            <Button icon="pi pi-th-large" className="p-button-text p-button-plain p-button-lg" />
                            <span>Apps</span>
                        </div>

                        <div className="sidebar-item">
                            <Button icon="pi pi-shield" className="p-button-text p-button-plain p-button-lg" />
                            <span>Prime Blocks</span>
                        </div>

                        <div className="sidebar-item">
                            <Button icon="pi pi-pencil" className="p-button-text p-button-plain p-button-lg" />
                            <span>Utilities</span>
                        </div>

                        <div className="sidebar-item">
                            <Button icon="pi pi-briefcase" className="p-button-text p-button-plain p-button-lg" />
                            <span>Pages</span>
                        </div>

                        <div className="sidebar-item">
                            <Button icon="pi pi-wallet" className="p-button-text p-button-plain p-button-lg" />
                            <span>E-Commerce</span>
                        </div>

                        <div className="sidebar-item">
                            <Button icon="pi pi-user" className="p-button-text p-button-plain p-button-lg" />
                            <span>User Management</span>
                        </div>
                    </div>
                </div>

                <div className="content">
                    {/* Aquí va el contenido principal de la página */}
                    <h1>Bienvenido a la Gestión de la Cocina</h1>
                    <p>Aquí puedes ver el contenido relacionado con los pedidos y el estado de la cocina.</p>
                </div>
            </div>
        </div>
    );
}
