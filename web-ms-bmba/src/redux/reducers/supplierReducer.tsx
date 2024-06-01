import { Reducer } from 'redux';
import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/supplierActionTypes';
import { ICompany as Company } from '../../models/company';
import { IProduct } from '../../models/product';
import { IProductsRes } from '../../models/productRes';
import { ISupplier } from '../../models/supplier';

export interface ISuppliersState {
    suppliers: ISupplier[];
    loading: boolean;
    isAddProductModalOpen: boolean;
    isEditProductModalOpen: boolean;
    error: String | null,
}
const initialState = {
    suppliers: [],
    loading: false,
    isAddProductModalOpen: false,
    isEditProductModalOpen: false,
    error: null,
};
export const ProductReducer: Reducer<ISuppliersState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_SUPPLIERS_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case ActionType.FETCH_SUPPLIERS:
            return {
                ...state,
                loading: true
            };

        case ActionType.FETCH_SUPPLIERS_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case ActionType.ADD_SUPPLIER:
            return {
                ...state,
                loading: true
            };
        // case ActionType.OPEN_ADD_PRODUCT_MODAL:
        //     return {
        //         ...state,
        //         isAddProductModalOpen: true
        //     };
        // case ActionType.CLOSE_ADD_PRODUCT_MODAL:
        //     return {
        //         ...state,
        //         isAddProductModalOpen: false
        //     };
        // case ActionType.OPEN_EDIT_PRODUCT_MODAL:
        //     return {
        //         ...state,
        //         isAddProductModalOpen: true
        //     };
        // case ActionType.CLOSE_EDIT_PRODUCT_MODAL:
        //     return {
        //         ...state,
        //         isAddProductModalOpen: false
        //     };
        case ActionType.EDIT_SUPPLIER:
            return {
                ...state,
                loading: true
            };

        case ActionType.DELETE_SUPPLIER:
            return {
                ...state,
                loading: true
            };

        case ActionType.ADD_SUPPLIER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case ActionType.DELETE_SUPPLIER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case ActionType.ADD_SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case ActionType.EDIT_SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case ActionType.DELETE_SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
};
