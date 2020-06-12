import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RouteHandler from './components/RouteHandler'; 

import Home from './pages/Home';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import NewMissing from './pages/NewMissing/index.jsx';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const Routes = () => {
    return (
        <Switch>
            <Route component={ Home } path="/" exact />
            <Route component={ Login } path="/login" />
            <Route component={ NewUser } path="/register" />
            <RouteHandler private component={ NewMissing } path="/newmissing" />
            <RouteHandler private component={ NewMissing } path="/editanimal/:id" />
            <RouteHandler private component={ Profile } path="/profile" />
            <Route> <NotFound /> </Route>
        </Switch>
    );
}

export default Routes;