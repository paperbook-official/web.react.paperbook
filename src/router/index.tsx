import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { isAuthenticated } from '../services/auth';

import Login from '../pages/auth/Login';
import Home from '../pages/Home';

interface PrivateRouteProps {
    component: React.FC;
    path: string;
    exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (
    props: PrivateRouteProps
): JSX.Element =>
    isAuthenticated() ? (
        <Route
            path={props.path}
            exact={props.exact}
            component={props.component}
        />
    ) : (
        <Redirect to="/" />
    );

const Routes = (): JSX.Element => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={() => <h1>Sign Up</h1>} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cart" component={() => <h1>Cart</h1>} />
            <PrivateRoute path="/private" component={() => <h1>Private</h1>} />
            <Route path="*" component={() => <h1>Page Not Found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
