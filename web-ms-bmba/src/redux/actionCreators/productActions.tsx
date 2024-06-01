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
    IAddProduct,
    IAddProductFail,
    IAddProductSuccess,
    IDeleteProduct,
    IDeleteProductFail,
    IDeleteProductSuccess,
    IEditProduct,
    IEditProductFail,
    IEditProductSuccess,
    IFetchProduct,
    IFetchProductFail,
    IFetchProductSuccess,
    IFetchProducts,
    IFetchProductsFail,
    IFetchProductsSuccess,

} from '../actionTypes/productActionTypes';
import { IProduct } from '../../models/product';
import { IProductsRes } from '../../models/productRes';


// export const getProducts = (): ThunkResult<void> => async (dispatch: Dispatch<Action>) => { 
//     dispatch<IFetchProducts>({  
//         type: ActionType.FETCH_PRODUCTS
//     });
//     try {
//         const response: AxiosResponse<IProduct[]> = await axios.post(`/auth/login`, body, config);

export const getProducts = (query: {
    productName?: string;
    categoryName?: string;
    selfCode?: string;
    supplierName?: string;
    pageNumber?: number;
    pageSize?: number;
}): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
    dispatch<IFetchProducts>({
        type: ActionType.FETCH_PRODUCTS
    });
    try {
        // Construct the query string
        const queryString = Object.entries(query)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => `${key}=${encodeURIComponent(value.toString())}`)
            .join('&');

        // Append the query string to the base URL
        const url = `products/?${queryString}`;

        // Make the GET request
        const response: AxiosResponse<IProductsRes> = await axios.get(url);
        dispatch<IFetchProductsSuccess>({
            type: ActionType.FETCH_PRODUCTS_SUCCESS,
            payload: response.data
        });
    } catch (err: any) {
        dispatch<IFetchProductsFail>({
            type: ActionType.FETCH_PRODUCTS_FAIL,
            payload: err
        });
    }
}

export const addProduct = (product: IProduct): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => { 
    dispatch<IAddProduct>({ 
        type: ActionType.ADD_PRODUCT
    });
    try {
        const response: AxiosResponse<IProduct> = await axios.post(`/products`, product);
        dispatch<IAddProductSuccess>({
            type: ActionType.ADD_PRODUCT_SUCCESS,
            payload: response.data  
        });

    } catch(err:any) {
        dispatch<IAddProductFail>({
            type: ActionType.ADD_PRODUCT_FAIL,
            payload: err
        });
    }
};

// export const getProduct = (id: number): ThunkResult<void> => async (dispatch: Dispatch<Action>) => { 
//     dispatch<IFetchProduct>({
//         type: ActionType.FETCH_PRODUCT
//     });

//     try {
//         const response: AxiosResponse<IProduct> = await axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`);
//         dispatch<IFetchProductSuccess>({
//             type: ActionType.FETCH_PRODUCT_SUCCESS,
//             payload: response.data  
//         });

//     } catch(err:any) {
//         dispatch<IFetchProductFail>({
//             type: ActionType.FETCH_PRODUCT_FAIL,
//             payload: err
//         });
//     }
// }

export const editDiscount = (product: IProduct): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => { 
    dispatch<IEditProduct>({ 
        type: ActionType.EDIT_PRODUCT
    });
    try {
        const response: AxiosResponse<IProduct> = await axios.put(`/products`, product);
        dispatch<IEditProductSuccess>({
            type: ActionType.EDIT_PRODUCT_SUCCESS,
            payload: response.data  
        });

    } catch(err:any) {
        dispatch<IEditProductFail>({
            type: ActionType.EDIT_PRODUCT_FAIL,
            payload: err
        });
    }
};


export const deleteDiscount = (productId: number): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => { 
    dispatch<IDeleteProduct>({ 
        type: ActionType.DELETE_PRODUCT
    });
    try {
        const response: AxiosResponse = await axios.delete(`/discounts/${productId}`); 
        dispatch<IDeleteProductSuccess>({
            type: ActionType.DELETE_PRODUCT_SUCCESS,
            payload: response.data  
        });

    } catch(err:any) {
        dispatch<IDeleteProductFail>({
            type: ActionType.DELETE_PRODUCT_FAIL,
            payload: err
        });
    }
};
