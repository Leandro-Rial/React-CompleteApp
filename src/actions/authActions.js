import Swal from "sweetalert2";
import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../utils/firebase/firebase";

// Google Login

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        Swal.fire("Fail", err.message, "error");
      });
  };
};

// Email and Password Login

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        Swal.fire("Fail", err.message, "error");
      });
  };
};

// Email and Password Register

export const startRegisterWithEmailAndPassword = (
  email,
  password,
  firstName,
  lastName
) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: firstName + " " + lastName });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        Swal.fire("Fail", err.message, "error");
      });
  };
};

// Login

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

// Logout

export const logout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch({
      type: types.logout,
    });
  };
};
