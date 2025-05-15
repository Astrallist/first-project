import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED
} from '../actions/auth';

const initialState = {
    user: null,
    isAuth: false,
    registerRequest: false,
    registerFailed: false,
    loginRequest: false,
    loginFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    refreshTokenRequest: false,
    refreshTokenFailed: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return { ...state, registerRequest: true };
        case REGISTER_SUCCESS:
            return { ...state, registerRequest: false, user: action.payload, isAuth: true };
        case REGISTER_FAILED:
            return { ...state, registerRequest: false, registerFailed: true };

        case LOGIN_REQUEST:
            return { ...state, loginRequest: true };
        case LOGIN_SUCCESS:
            return { ...state, loginRequest: false, user: action.payload, isAuth: true };
        case LOGIN_FAILED:
            return { ...state, loginRequest: false, loginFailed: true };

        case LOGOUT_REQUEST:
            return { ...state, logoutRequest: true };
        case LOGOUT_SUCCESS:
            return { ...state, logoutRequest: false, user: null, isAuth: false };
        case LOGOUT_FAILED:
            return { ...state, logoutRequest: false, logoutFailed: true };

        case REFRESH_TOKEN_REQUEST:
            return { ...state, refreshTokenRequest: true };
        case REFRESH_TOKEN_SUCCESS:
            return { ...state, refreshTokenRequest: false };
        case REFRESH_TOKEN_FAILED:
            return { ...state, refreshTokenRequest: false, refreshTokenFailed: true };

        case GET_USER_REQUEST:
            return { ...state, getUserRequest: true };
        case GET_USER_SUCCESS:
            return { ...state, getUserRequest: false, user: action.payload, isAuth: true };
        case GET_USER_FAILED:
            return { ...state, getUserRequest: false, getUserFailed: true };

        default:
            return state;
    }
};