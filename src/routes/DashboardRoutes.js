import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';


export const DashboardRoutes = () => {

    return (
        <>
            <div className="container mt-2">
                <Switch>
                    <Route exact path="/home" component={ HomePage } />
                    <Redirect to="/home" />
                </Switch>
            </div>
        </>
    )
}