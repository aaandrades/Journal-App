import { firebase, googleAuthProvider } from "../../firebase/firebase-config";
import { types } from "../Types/types";
import { disableLoadingAction, enableLoadingAction } from "./uiActions";
import { cleanNotesAction } from "./notesActions";
import swal from "sweetalert";

// Login with email and password
export const initLoginAction = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(enableLoadingAction());
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(loginAction(user.uid, user.displayName));
      dispatch(disableLoadingAction());
    } catch (error) {
      dispatch(disableLoadingAction());
      swal("Login failed", "Email or Password are invalid!", "error");
    }
  };
};

// Register email and password
export const initRegisterAction = (name, email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({
          displayName: name,
          returnSecureToken: true,
        });
        dispatch(loginAction(user.uid, user.displayName));
      })
      .catch((error) => {
        swal("Register failed", error.message, "error");
      });
  };
};

// Register with google sign-in
export const startGoogleLoginAction = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(loginAction(user.uid, user.displayName));
      })
      .catch((error) => {
        swal("Google Sign-in Failed!", error.message, "error");
      });
  };
};

// Correct user/password
export const loginAction = (uid, displayName) => ({
  type: types.login,
  payload: { uid, displayName },
});

export const startLogout = () => {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      swal({
        title: "Closing session",
        text: "Wait for it, we're destroying information :)",
        closeOnClickOutside: false,
        buttons: false,
      });
      dispatch(logoutAction());
      dispatch(cleanNotesAction());
      window.location.href = "/";
    } catch (error) {
      swal(
        "Logout Failed!",
        "An error occurred while logging out. Please try again. ",
        "error"
      );
    }
  };
};

// Logout Action
export const logoutAction = () => ({
  type: types.logout,
});
