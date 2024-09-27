import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
// import OrdersPage from '@/pages/kitchen/order';

export default function KitchenSidebar({ children }) {
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
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvrftcp5FwziJftgD1TlYJSl8WcOza-5iX5ZzgBk6gU0YEvN6UwYMa0mfROJOHwm6fBRk&usqp=CAU" alt="user" className="profile-pic" />
                <span>Kitchen Master</span>  {/* Nombre del usuario */}
                <i className="pi pi-angle-down p-ml-2"></i>  {/* Ícono de menú desplegable */}
            </div>
        </div>
    );

    return (
        <div>
            {/* Navbar */}
            <Menubar start={start} end={end} className="navbar" />
            
            <div>
                {/* Sidebar */}
                <div className="sidebar"> 

                    <div className="sidebar-items">
                        <div className="sidebar-item">
                            <Button icon="pi pi-home" className="p-button-text p-button-plain p-button-lg" />
                            <span>Dashboards</span>
                        </div>

                        <div className="sidebar-item">
                            <Button icon="pi pi-th-large" className="p-button-text p-button-plain p-button-lg" />
                            <span>Ordenes</span>
                        </div>

                        <div className="sidebar-item">
                            <Button icon="pi pi-wallet" className="p-button-text p-button-plain p-button-lg" />
                            <span>Menú</span>
                        </div>

                        {/* <div className="sidebar-item">
                            <Button icon="pi pi-star" className="p-button-text p-button-plain p-button-lg" />
                            <span>UI Kit</span>
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
                            <Button icon="pi pi-user" className="p-button-text p-button-plain p-button-lg" />
                            <span>User Management</span>
                        </div> */}
                    </div>
                </div>

                <div className="content">
                    {/* <h1>Bienvenido a la Gestión de la Cocina</h1>
                    <p>Aquí puedes ver el contenido relacionado con los pedidos y el estado de la cocina.</p> */}
                    {/* <OrdersPage /> */}
                    {children}
                </div>
            </div>
        </div>
    );
}
