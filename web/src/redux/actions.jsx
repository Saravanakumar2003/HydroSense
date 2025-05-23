
import * as  types from "./actionTypes"
import {auth,googleAuthProvider, githubAuthProvider} from "../firebase"

const registerStart = () =>({
    type:types.REGISTER_START,
})

const registerSuccess = (user) =>({
    type:types.REGISTER_SUCCESS,
    payload:user,
})

const registerFail = (error) =>({
    type:types.REGISTER_FAIL,
    payload:error,
})


const loginStart = () =>({
    type:types.LOGIN_START,
})

const loginSuccess = (user) =>({
    type:types.LOGIN_SUCCESS,
    payload:user,
})

const loginFail = (error) =>({
    type:types.LOGIN_FAIL,
    payload:error,
})

const googleSignInStart = () =>({
    type:types.GOOGLE_SIGN_IN_START,
})

const googleSignInSuccess = (user) =>({
    type:types.GOOGLE_SIGN_IN_SUCCESS,
    payload:user,
})

const googleSignInFail = (error) =>({
    type:types.GOOGLE_SIGN_IN_FAIL,
    payload:error,
})


const logoutStart = () =>({
    type:types.LOGOUT_START,
})

const logoutSuccess = () =>({
    type:types.LOGOUT_SUCCESS,
})

const logoutFail = (error) =>({
    type:types.LOGOUT_FAIL,
    payload:error,
})

export const setUser = (user) =>({
    type:types.SET_USER,
    payload:user,
})

const githubSignInStart = () =>({
    type:types.GITHUB_SIGN_IN_START,
})

const githubSignInSuccess = (user) =>({
    type:types.GITHUB_SIGN_IN_SUCCESS,
    payload:user,
})

const githubSignInFail = (error) =>({
    type:types.GITHUB_SIGN_IN_FAIL,
    payload:error,
})


export const registerInitiate = (email, password, displayName) => {
    return function (dispatch) {
        dispatch(registerStart());
        auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
            user.updateProfile({ displayName });
            user.sendEmailVerification();
            dispatch(registerSuccess(user));
            alert("Registration successful! Please check your email to verify your account.");
        })
        .catch((error) => dispatch(registerFail(error.message)));
    }
}

export const loginInitiate = (email, password) => {
    return function (dispatch) {
        dispatch(loginStart());
        auth.signInWithEmailAndPassword(email, password).then(({ user }) => {
            if (user.emailVerified) {
                dispatch(loginSuccess(user));
            } else {
                dispatch(loginSuccess(user));
                alert("Please verify your email before logging in.");
            }
        })
        .catch((error) => dispatch(loginFail(error.message)));
    }
}

export const logoutInitiate = ()=>{
    return function (dispatch){
        dispatch(logoutStart());
        auth
        .signOut()
        .then((resp)=>dispatch(logoutSuccess()))
        .catch((error)=>dispatch(logoutFail(error.message)));
    }
}


export const googleSignInInitiate =()=>{
    return function (dispatch){
        dispatch(googleSignInStart());
        auth
        .signInWithPopup(googleAuthProvider)
        .then(({user})=>{
            dispatch(googleSignInSuccess(user))
        })
        .catch((error)=>dispatch(googleSignInFail(error.message)));
    }
}

export const githubSignInInitiate =()=>{
    return function (dispatch){
        dispatch(githubSignInStart());
        auth
        .signInWithPopup(githubAuthProvider)
        .then(({user})=>{
            dispatch(githubSignInSuccess(user))
        })
        .catch((error)=>dispatch(githubSignInFail(error.message)));
    }
}
