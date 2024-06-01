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
    IAddCategory,
    IAddCategoryFail,
    IAddCategorySuccess,
    IFetchCategories,
    IFetchCategoriesFail,
    IFetchCategoriesSuccess,

} from '../actionTypes/categoryActionTypes';
import { IProduct } from '../../models/product';
import { IProductsRes } from '../../models/productRes';
import { ICategory } from '../../models/category';


// export const getProducts = (): ThunkResult<void> => async (dispatch: Dispatch<Action>) => { 
//     dispatch<IFetchProducts>({  
//         type: ActionType.FETCH_PRODUCTS
//     });
//     try {
//         const response: AxiosResponse<IProduct[]> = await axios.post(`/auth/login`, body, config);

export const getCategories = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
    dispatch<IFetchCategories>({
        type: ActionType.FETCH_CATEGORIES
    });
    try {
        const response: AxiosResponse<ICategory[]> = await axios.get(`categories`);
        dispatch<IFetchCategoriesSuccess>({
            type: ActionType.FETCH_CATEGORIES_SUCCESS,
            payload: response.data
        });
    } catch (err: any) {
        dispatch<IFetchCategoriesFail>({
            type: ActionType.FETCH_CATEGORIES_FAIL,
            payload: err
        });
    }
}

export const addProduct = (category: ICategory): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => { 
    dispatch<IAddCategory>({ 
        type: ActionType.ADD_CATEGORY
    });
    try {
        const response: AxiosResponse<ICategory> = await axios.post(`/categories`, category);
        dispatch<IAddCategorySuccess>({
            type: ActionType.ADD_CATEGORY_SUCCESS,
            payload: response.data  
        });

    } catch(err:any) {
        dispatch<IAddCategoryFail>({
            type: ActionType.ADD_CATEGORY_FAIL,
            payload: err
        });
    }
};



