import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';

const AuthRouter = () => {
    return (
        <>
            <Switch>
                <Route exact path="/auth/signin" component={SignIn} />
                <Route exact path="/auth/signup" component={SignUp} />

                <Redirect to="/auth/signin" />
            </Switch>
        </>
    )
}

export default AuthRouter
