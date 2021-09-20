import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { DashboardRoutes } from './DashboardRoutes';
import { LoginPage } from '../pages/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogged } from '../core/session';
import { userLoggedActions } from '../core/login';


export const AppRouter = () => {
    const { userLogged } = useSelector(state => state);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(userLoggedActions.setUserLogged(getUserLogged() && getUserLogged()[0]))
    }, []);


    return (
        <Router>
            <>
                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        component={LoginPage}
                        isAuthenticated={userLogged.logged }
                      
                    />
                    <PrivateRoute
                        path="/"
                        component={DashboardRoutes}
                        isAuthenticated={userLogged.logged}
                    />
                </Switch>
            </>
        </Router>
    )
}