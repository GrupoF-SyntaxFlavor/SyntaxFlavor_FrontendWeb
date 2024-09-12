import React from 'react';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo-container">
                <img alt="logo" src="logo.png" className="logo" />
            </div>
            
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
    );
}
