import { Reducer } from 'redux';
import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/categoryActionTypes';
import { ICompany as Company } from '../../models/company';
import { IProduct } from '../../models/product';
import { IProductsRes } from '../../models/productRes';
import { ICategory } from '../../models/category';

export interface ICategoriesState {
    categories: ICategory[];
    loading: boolean;
    isAddCategoryModalOpen: boolean;
    isEditCategoryModalOpen: boolean;
    error: String | null,
}
const initialState = {
    categories: [],
    loading: false,
    isAddCategoryModalOpen: false,
    isEditCategoryModalOpen: false,
    error: null,
};
export const CategoryReducer: Reducer<ICategoriesState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        
        case ActionType.FETCH_CATEGORIES_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                categories: action.payload,
                loading: false
            };


        case ActionType.FETCH_CATEGORIES_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case ActionType.FETCH_CATEGORIES:
            return {
                ...state,
                loading: true
            };

        case ActionType.ADD_CATEGORY_FAIL:

        case ActionType.ADD_CATEGORY_SUCCESS:

        case ActionType.ADD_CATEGORY:
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









        default:
            return state;
    }
};
