import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signIngWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";


//TAREAS ASINCRONAS EN THUNKS SINO DIRECTAMENTE DESDE REDUCER
export const checkingAuthentication = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signIngWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName}) => {

    return async(dispatch) => {

        dispatch ( checkingCredentials());
        const { ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({displayName,password, email});
        if( !ok ) return dispatch( logout({errorMessage}))
        dispatch(login({uid, displayName, email, photoURL }));


    }
}

export const startLoginWithEmailPassword = ({ email, password}) => {

    return async(dispatch) => {
        dispatch ( checkingCredentials());
        const { displayName, ok, uid, photoURL, errorMessage}= await loginWithEmailPassword({ email, password})
        if( !ok ) return dispatch( logout({errorMessage}))
        dispatch(login({uid, displayName, email, photoURL }));
    }

}

export const startLogout = () => {
  return async(dispatch) => {
    try {
      await logoutFirebase();
      dispatch(logout({}))
    } catch (error) {
      console.log(error)
    }
    

  }
}

