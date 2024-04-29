import { AnyAction, Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import axios from '../../services/axios';

import { IAuth as Auth } from '../../models/auth';
import { 
    Action,
    ActionType, 
    ILoginAuthFail, 
    ILoginAuthStart,
    ILoginAuthSuccess
} from '../actionTypes/authActionTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store/store';
import { RootActions, ThunkResult } from './actionResultTypes';

// Headers
type Config = {
    headers: Record<string, string>
};


   
export const LoginAuthStart = (cardId: string, password: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
        dispatch<ILoginAuthStart>({ type: ActionType.LOGIN_AUTH_START });

        const config: Config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const body = JSON.stringify({
            cardId,
            password
        });

        try {
            const response: AxiosResponse<Auth> = await axios.post(`/auth/login`, body, config);
            dispatch<ILoginAuthSuccess>({
                type: ActionType.LOGIN_AUTH_SUCCESS,
                payload: response.data
            });
        } catch (err: any) {
            dispatch<ILoginAuthFail>({
                type: ActionType.LOGIN_AUTH_FAIL,
                payload: err
            });    
        }
    };




