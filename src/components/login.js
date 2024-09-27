import React from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Login = () => {
    return (
        <div className="login-container">
            <Card className="login-card">
                <h2>Login</h2>
                <div className="p-fluid">
                    <label htmlFor="username">Username</label>
                    <InputText id="username" />

                    <label htmlFor="password">Password</label>
                    <InputText id="password" type="password" />

                    <Button label="Login" className="p-button-primary" />
                </div>
            </Card>
        </div>
    );
};

export default Login;