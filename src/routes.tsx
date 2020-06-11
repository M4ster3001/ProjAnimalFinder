import React from 'react';
import { Switch } from 'react-router-dom';

import RouteHandler from './components/RouteHandler'; 

import Home from './pages/Home';
import Animal from './pages/Animal';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import NewMissing from './pages/NewMissing';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const Routes = () => {
    return (
        <Switch>
            <RouteHandler component={ Home } path="/" exact />
            <RouteHandler component={ Animal } path="/animal/:id" />
            <RouteHandler component={ Login } path="/login" />
            <RouteHandler component={ NewUser } path="/register" />
            <RouteHandler private component={ NewMissing } path="/newmissing" />
            <RouteHandler private component={ Profile } path="/profile" />
            <RouteHandler> <NotFound /> </RouteHandler>
        </Switch>
    );
}

export default Routes;