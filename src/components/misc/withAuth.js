import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../context/AuthContext';

const withAuth = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
        const { isAuthenticated } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login'); // Redirect to login page if not authenticated
            }
        }, [isAuthenticated, router]);

        if (!isAuthenticated) {
            return null; // Render nothing while redirecting
        }

        return <WrappedComponent {...props} />;
    };

    AuthenticatedComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return AuthenticatedComponent;
};

export default withAuth;