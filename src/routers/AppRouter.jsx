import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { firebase } from "../utils/firebase/firebase";
import CompleteScreen from "../components/Complete/CompleteScreen";
import PageNotFound from "../utils/PageNotFound";
import AuthRouter from "./AuthRouter";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { login } from "../actions/authActions";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();

// View Info about the users

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [dispatch, setIsLoggedIn]);

  return (
    <Router>
      <Switch>
        <PublicRouter
          path="/auth"
          component={AuthRouter}
          isAuthenticated={isLoggedIn}
        />

        <PrivateRouter
          exact
          path="/"
          component={CompleteScreen}
          isAuthenticated={isLoggedIn}
        />

        <Route path="*" component={PageNotFound} />

        <Redirect to="/auth/signin" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
