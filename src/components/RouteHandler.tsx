import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../services/authHandler'; 

export default ({ children, ...rest }: any) => {
    
    let logged = isLogged();
    let authorized = ( rest.private && logged ) ? true : false;

    return (
        <Route
            { ...rest }
            render={ () => 
                authorized === true ? children : <Redirect to="/login" />
            }
        />
    );
}