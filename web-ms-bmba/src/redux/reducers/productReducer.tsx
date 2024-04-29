import { Reducer } from 'redux';
import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/productActionTypes';
import { ICompany as Company } from '../../models/company';
import { IProduct } from '../../models/product';

export interface IProductsState {
    products: IProduct[] | null;
    product: IProduct | null;
    loading: boolean;
    isAddProductModalOpen: boolean;
    isEditProductModalOpen: boolean;
    error: String | null,
}
const initialState = {
    products: [],
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
        case ActionType.FETCH_PRODUCT:
        case ActionType.FETCH_PRODUCTS:
        case ActionType.ADD_PRODUCT:
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
        case ActionType.FETCH_PRODUCTS_FAIL:
        case ActionType.ADD_PRODUCT_FAIL:
        case ActionType.EDIT_PRODUCT_FAIL:
        case ActionType.DELETE_PRODUCT_FAIL:

        case ActionType.FETCH_PRODUCT_SUCCESS:
        case ActionType.ADD_PRODUCT_SUCCESS:


        case ActionType.EDIT_PRODUCT_SUCCESS:

        case ActionType.FETCH_PRODUCTS_SUCCESS:


        case ActionType.DELETE_PRODUCT_SUCCESS:

        default:
            return state;
    }
};
