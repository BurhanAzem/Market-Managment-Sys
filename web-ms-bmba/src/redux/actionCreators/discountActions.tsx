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
    IAddDiscount,
    IAddDiscountFail,
    IAddDiscountSuccess,
    IDeleteDiscount,
    IDeleteDiscountFail,
    IDeleteDiscountSuccess,
    IEditDiscount,
    IEditDiscountFail,
    IEditDiscountSuccess,
    IOpenAddDiscountModal,

} from '../actionTypes/discountActionTypes';
import { ICategory } from '../../models/category';
import { IShelf } from '../../models/shelf';
import { IDiscount } from '../../models/discount';
import { IAddCategoryFail } from '../actionTypes/categoryActionTypes';




export const addDiscount = (discount: IDiscount): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => { 
    dispatch<IAddDiscount>({ 
        type: ActionType.ADD_DISCOUNT
    });
    try {
        const payload = { DiscountDto: discount };
        
        const response: AxiosResponse<IDiscount> = await axios.post(`/discounts`, payload);        
        dispatch<IAddDiscountSuccess>({
            type: ActionType.ADD_DISCOUNT_SUCCESS,
            payload: response.data  
        });

    } catch(err:any) {
        dispatch<IAddDiscountFail>({
            type: ActionType.ADD_DISCOUNT_FAIL,
            payload: err
        });
    }
};

export const editDiscount = (discount: IDiscount): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => { 
    dispatch<IEditDiscount>({ 
        type: ActionType.EDIT_DISCOUNT
    });
    try {
        const response: AxiosResponse<IDiscount> = await axios.put(`/discounts`, discount);
        dispatch<IEditDiscountSuccess>({
            type: ActionType.EDIT_DISCOUNT_SUCCESS,
            payload: response.data  
        });

    } catch(err:any) {
        dispatch<IEditDiscountFail>({
            type: ActionType.EDIT_DISCOUNT_FAIL,
            payload: err
        });
    }
};


export const deleteDiscount = (discountId: number): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => { 
    dispatch<IDeleteDiscount>({ 
        type: ActionType.DELETE_DISCOUNT
    });
    try {
        const response: AxiosResponse = await axios.delete(`/discounts/${discountId}`); 
        dispatch<IDeleteDiscountSuccess>({
            type: ActionType.DELETE_DISCOUNT_SUCCESS,
            payload: response.data  
        });

    } catch(err:any) {
        dispatch<IDeleteDiscountFail>({
            type: ActionType.DELETE_DISCOUNT_FAIL,
            payload: err
        });
    }
};


