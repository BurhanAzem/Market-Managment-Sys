import { Reducer } from 'redux';
import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/productActionTypes';
import { ICompany as Company } from '../../models/company';
import { IProduct } from '../../models/product';
import { IProductsRes } from '../../models/productRes';
import { IDiscount } from '../../models/discount';

export interface IProductsState {
    products: IProduct[];
    pageNumber: number;
    totalPages: number;
    discount: IDiscount | null;
    product: IProduct | null;
    loading: boolean;
    isAddProductModalOpen: boolean;
    isEditProductModalOpen: boolean;
    error: String | null,
}
const initialState = {
    pageNumber: 1,
    totalPages: 1,
    products: [],
    discount: null,
    product: null,
    loading: false,
    isAddProductModalOpen: false,
    isEditProductModalOpen: false,
    error: null,
};
export const ProductReducer: Reducer<IProductsState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_PRODUCTS_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                products: action.payload.products,
                pageNumber: action.payload.pageNumber,
                totalPages: action.payload.totalPages,
                loading: false
            };
        case ActionType.FETCH_PRODUCT:
        case ActionType.FETCH_PRODUCTS:
            return {
                ...state,
                loading: true
            };

        case ActionType.FETCH_PRODUCTS_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case ActionType.ADD_PRODUCT:
            return {
                ...state,
                loading: true
            };
        case ActionType.OPEN_ADD_PRODUCT_MODAL:
            return {
                ...state,
                isAddProductModalOpen: true
            };
        case ActionType.CLOSE_ADD_PRODUCT_MODAL:
            return {
                ...state,
                isAddProductModalOpen: false
            };
        case ActionType.OPEN_EDIT_PRODUCT_MODAL:
            return {
                ...state,
                isAddProductModalOpen: true
            };
        case ActionType.CLOSE_EDIT_PRODUCT_MODAL:
            return {
                ...state,
                isAddProductModalOpen: false
            };
        case ActionType.EDIT_PRODUCT:
        case ActionType.DELETE_PRODUCT:


        case ActionType.FETCH_PRODUCT_FAIL:

        case ActionType.ADD_PRODUCT_FAIL:
        case ActionType.EDIT_PRODUCT_FAIL:
        case ActionType.DELETE_PRODUCT_FAIL:

        case ActionType.FETCH_PRODUCT_SUCCESS:
        case ActionType.ADD_PRODUCT_SUCCESS:


        case ActionType.EDIT_PRODUCT_SUCCESS:




        case ActionType.DELETE_PRODUCT_SUCCESS:

        default:
            return state;
    }
};
