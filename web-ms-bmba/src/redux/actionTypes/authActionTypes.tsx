import { IAuth as Auth } from '../../models/auth';

export enum ActionType {
    LOGIN_AUTH_START = 'LOGIN_AUTH_START',
    LOGIN_AUTH_SUCCESS = 'LOGIN_AUTH_SUCCESS',
    LOGIN_AUTH_FAIL = 'LOGIN_AUTH_FAIL',
    
    LOGOUT_AUTH_START = 'LOGOUT_AUTH_START',
    LOGOUT_AUTH_SUCCESS = 'LOGOUT_AUTH_SUCCESS',
    LOGOUT_AUTH_FAIL = 'LOGOUT_AUTH_FAIL',
   
    REGISTER_AUTH_START = 'REGISTER_AUTH_START',
    REGISTER_AUTH_SUCCESS = 'REGISTER_AUTH_SUCCESS',
    REGISTER_AUTH_FAIL = 'REGISTER_AUTH_FAIL',
}

export interface ILoginAuthStart {
    type: ActionType.LOGIN_AUTH_START;
}
export interface ILoginAuthSuccess {
    type: ActionType.LOGIN_AUTH_SUCCESS;
    payload: Auth;
}
export interface ILoginAuthFail {
    type: ActionType.LOGIN_AUTH_FAIL;
    payload: string | null;
}

export interface ILogoutAuthStart {
    type: ActionType.LOGOUT_AUTH_START;
}
export interface ILogoutAuthSuccess {
    type: ActionType.LOGOUT_AUTH_SUCCESS;
    payload: Auth;
}
export interface ILogoutAuthFail {
    type: ActionType.LOGOUT_AUTH_FAIL;
    payload: string | null;
}

export interface IRegisterAuthStart {
    type: ActionType.REGISTER_AUTH_START;
}
export interface IRegisterAuthSuccess {
    type: ActionType.REGISTER_AUTH_SUCCESS;
    payload: Auth;
}
export interface IRegisterAuthFail {
    type: ActionType.REGISTER_AUTH_FAIL;
    payload: string | null;
}

export type Action =
    | ILoginAuthStart
    | ILoginAuthSuccess
    | ILoginAuthFail
    | ILogoutAuthStart
    | ILogoutAuthSuccess
    | ILogoutAuthFail
    | IRegisterAuthStart
    | IRegisterAuthSuccess
    | IRegisterAuthFail;