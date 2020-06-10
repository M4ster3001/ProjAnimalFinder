import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Animal from './pages/Animal';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import NewMissing from './pages/NewMissing';
import Profile from './pages/Profile';

const Routes = () => {
    return (
        <Switch>
            <Route component={ Home } path="/" exact />
            <Route component={ Animal } path="/animal/:id" />
            <Route component={ Login } path="/login" />
            <Route component={ NewUser } path="/register" />
            <Route component={ NewMissing } path="/newmissing" />
            <Route component={ Profile } path="/profile/:id" />
        </Switch>
    );
}

export default Routes;