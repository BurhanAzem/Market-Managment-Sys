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
    IAddSupplier,
    IAddSupplierFail,
    IAddSupplierSuccess,
    IFetchSuppliers,
    IFetchSuppliersFail,
    IFetchSuppliersSuccess,

} from '../actionTypes/supplierActionTypes';
import { IProduct } from '../../models/product';
import { IProductsRes } from '../../models/productRes';
import { ICategory } from '../../models/category';
import { ISupplier } from '../../models/supplier';

export const getSuppliers = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
    dispatch<IFetchSuppliers>({
        type: ActionType.FETCH_SUPPLIERS
    });
    try {
        const response: AxiosResponse<ISupplier[]> = await axios.get(`suppliers`);
        dispatch<IFetchSuppliersSuccess>({
            type: ActionType.FETCH_SUPPLIERS_SUCCESS,
            payload: response.data
        });
    } catch (err: any) {
        dispatch<IFetchSuppliersFail>({
            type: ActionType.FETCH_SUPPLIERS_FAIL,
            payload: err
        });
    }
}

export const addSupplier = (supplier: ISupplier): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => { 
    dispatch<IAddSupplier>({ 
        type: ActionType.ADD_SUPPLIER
    });
    try {
        const response: AxiosResponse<ISupplier> = await axios.post(`/suppliers`, supplier);
        dispatch<IAddSupplierSuccess>({
            type: ActionType.ADD_SUPPLIER_SUCCESS,
            payload: response.data  
        });

    } catch(err:any) {
        dispatch<IAddSupplierFail>({
            type: ActionType.ADD_SUPPLIER_FAIL,
            payload: err
        });
    }
};



