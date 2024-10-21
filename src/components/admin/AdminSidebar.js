import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
// import OrdersPage from '@/pages/kitchen/order';

export default function AdminSidebar({ children }) {
    const start = (
        <div className="navbar-left">
            <div className="logo-container">
                <img alt="logo" src='https://images.pond5.com/pixel-sushi-vector-illustration-isolated-illustration-155825087_iconm.jpeg' className="logo" />
            </div>
            <span className="navbar-title">Gestión del Restaurante</span> {/* Título de la gestión de cocina */}
        </div>
    );

    const end = (
        <div className="navbar-right">
            <i className="pi pi-search p-mr-4"></i> {/* Ícono de búsqueda */}
            <i className="pi pi-bell p-mr-4"></i>   {/* Ícono de notificaciones */}
            <div className="user-profile">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvrftcp5FwziJftgD1TlYJSl8WcOza-5iX5ZzgBk6gU0YEvN6UwYMa0mfROJOHwm6fBRk&usqp=CAU" alt="user" className="profile-pic" />
                <span>Admin Master</span>  {/* Nombre del usuario */}
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
                        <div className="sidebar-item">
                            <Button icon="pi pi-users" className="p-button-text p-button-plain p-button-lg" />
                            <span>Cuentas de Cocina</span>
                        </div>      
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
