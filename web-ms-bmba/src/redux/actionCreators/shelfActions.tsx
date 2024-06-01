import { AnyAction, Dispatch } from 'redux';
import { ICompany as Company } from '../../models/company';
import { AxiosResponse } from 'axios';
import axios from '../../services/axios';
import history from '../../history';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store/store';
import {
    Action,
    ActionType,
    IAddShelf,
    IAddShelfFail,
    IAddShelfSuccess,
    IFetchShelfs,
    IFetchShelfsFail,
    IFetchShelfsSuccess,

} from '../actionTypes/shelfActionTypes';
import { ICategory } from '../../models/category';
import { IShelf } from '../../models/shelf';


export const getShelfs = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
    dispatch<IFetchShelfs>({
        type: ActionType.FETCH_SHELFS
    });
    try {
        const response: AxiosResponse<IShelf[]> = await axios.get(`shelfs`);
        dispatch<IFetchShelfsSuccess>({
            type: ActionType.FETCH_SHELFS_SUCCESS,
            payload: response.data
        });
    } catch (err: any) {
        dispatch<IFetchShelfsFail>({
            type: ActionType.FETCH_SHELFS_FAIL,
            payload: err
        });
    }
}

export const addShelf = (category: ICategory): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => { 
    dispatch<IAddShelf>({ 
        type: ActionType.ADD_SHELF
    });
    try {
        const response: AxiosResponse<IShelf> = await axios.post(`/shelfs`, category);
        dispatch<IAddShelfSuccess>({
            type: ActionType.ADD_SHELF_SUCCESS,
            payload: response.data  
        });

    } catch(err:any) {
        dispatch<IAddShelfFail>({
            type: ActionType.ADD_SHELF_FAIL,
            payload: err
        });
    }
};



