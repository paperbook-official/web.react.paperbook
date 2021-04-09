import React, { useEffect } from 'react';
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch,
    useHistory
} from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';

import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Search from '../pages/Search';

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
    const history = useHistory();
    const { getTokenCookie, token } = useAuth();
    const tokenCookie = getTokenCookie();

    return token || tokenCookie ? (
        <Route
            path={props.path}
            exact={props.exact}
            component={props.component}
        />
    ) : (
        <Redirect
            to={{
                pathname: '/login',
                state: { from: history.location.pathname }
            }}
        />
    );
};

const AuthRoute: React.FC<AuthRouteProps> = (
    props: AuthRouteProps
): JSX.Element => {
    const history = useHistory();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state: any = history.location.state;
    const { getTokenCookie, token } = useAuth();
    const tokenCookie = getTokenCookie();

    return token || tokenCookie ? (
        <Redirect to={{ pathname: state?.from || '/' }} />
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
    const { getTokenCookie, login, setToken } = useAuth();

    const autoLogin = async (): Promise<void> => {
        const token = getTokenCookie();

        if (token) {
            const userData = await login(token);
            setToken(token);
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
                <AuthRoute exact path="/signup" component={SignUp} />
                <AuthRoute exact path="/login" component={Login} />
                <Route exact path="/products" component={Search} />
                <Route exact path="/cart" component={() => <h1>Cart</h1>} />
                <PrivateRoute path="/products/new" component={Products} />
                <Route path="*" component={() => <h1>Page Not Found</h1>} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
