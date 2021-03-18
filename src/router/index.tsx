import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';

import Login from '../pages/auth/Login';
import Home from '../pages/Home';

interface PrivateRouteProps {
    component: React.FC;
    path: string;
    exact?: boolean;
}

interface AuthRouteProps {
    component: React.FC;
    path: string;
    exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (
    props: PrivateRouteProps
): JSX.Element => {
    const { token } = useAuth();
    return token ? (
        <Route
            path={props.path}
            exact={props.exact}
            component={props.component}
        />
    ) : (
        <Redirect to="/login" />
    );
};

const AuthRoute: React.FC<AuthRouteProps> = (
    props: AuthRouteProps
): JSX.Element => {
    const { token } = useAuth();
    return token ? (
        <Redirect to="/" />
    ) : (
        <Route
            path={props.path}
            exact={props.exact}
            component={props.component}
        />
    );
};

const Routes = (): JSX.Element => {
    const { setMe } = useUser();
    const { getTokenCookie, login } = useAuth();

    const autoLogin = async (): Promise<void> => {
        const token = getTokenCookie();

        if (token) {
            const userData = await login(token);
            setMe(userData);
        }
    };

    useEffect(() => {
        autoLogin();
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute
                    exact
                    path="/signup"
                    component={() => <h1>Sign Up</h1>}
                />
                <AuthRoute exact path="/login" component={Login} />
                <Route exact path="/cart" component={() => <h1>Cart</h1>} />
                <PrivateRoute
                    path="/private"
                    component={() => <h1>Private</h1>}
                />
                <Route path="*" component={() => <h1>Page Not Found</h1>} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
