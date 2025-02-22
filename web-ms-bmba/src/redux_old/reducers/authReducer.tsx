import { Reducer } from 'redux';

import { IAuth as Auth } from '../../models/auth';
import { IUser } from '../../models/user';
import { Action, ActionType } from '../actionTypes/authActionTypes';
import { LoginAuthStart } from '../actionCreators/authActions';


export interface IAuthState {
    authToken: string,
    isPasswordChanged: boolean,
    user: IUser | undefined | null;
    loading: boolean;
    error?: string | null;
}

const authTokenFromLocalStorage = localStorage.getItem('authToken');
const userFromLocalStorage = localStorage.getItem('user');

let user: IUser | undefined | null = null;
if (userFromLocalStorage) {
    try {
        user = JSON.parse(userFromLocalStorage);
    } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
    }
}

const initialState: IAuthState = {
    authToken: authTokenFromLocalStorage || '',
    isPasswordChanged: false,
    user: user,
    loading: false,
    error: null
};

export const AuthReducer: Reducer<IAuthState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.LOGIN_AUTH_START:
            return { ...state, loading: true };

        case ActionType.LOGIN_AUTH_SUCCESS:
            const auth_login: Auth = action.payload
            console.log(auth_login.token);
            
            const token = JSON.stringify(action.payload.token);
            localStorage.setItem('authToken', token);

            const user = JSON.stringify(action.payload.userDto);
            localStorage.setItem('user', user);

            return {
                ...state,
                authToken: action.payload.token,
                user: action.payload.userDto,
                error: null,
                loading: false
            };
        case ActionType.LOGIN_AUTH_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case ActionType.LOGOUT_AUTH_START:
            return { ...state, loading: true };

        case ActionType.LOGOUT_AUTH_SUCCESS:
            const auth_logout: Auth = action.payload
            return {
                ...state,
                authToken: "",
                user: null,
                error: null,
                loading: false
            };
        case ActionType.LOGOUT_AUTH_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };



        default:
            return state;
    }
};
