import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";


const PrivateRoute = ({children}) => {
    const {isAuthenticated, isloading} = useAuth0();

    if (isloading) return <div>Loading...</div>

    

    return isAuthenticated ?(
        <>{children}</>
        
    ): (<div>No esta autenticado</div>)
}

export default PrivateRoute

