import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../context/AuthContext';

const withAuth = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
        const { isAuthenticated } = useContext(AuthContext);
        const router = useRouter();
        // FIXME: We should create a admin-role in keycloak :)
        useEffect(() => {
            if (!isAuthenticated && !router.pathname.startsWith('/admin')) {
                router.push('/login');
            }
        }, [isAuthenticated, router]);

        if (!isAuthenticated && !router.pathname.startsWith('/admin')) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    AuthenticatedComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return AuthenticatedComponent;
};

export default withAuth;
