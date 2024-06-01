import { Reducer } from 'redux';
import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/shelfActionTypes';
import { ICompany as Company } from '../../models/company';
import { IProduct } from '../../models/product';
import { IProductsRes } from '../../models/productRes';
import { ICategory } from '../../models/category';
import { IShelf } from '../../models/shelf';

export interface IShelfsState {
    shelfs: IShelf[];
    loading: boolean;
    isAddCategoryModalOpen: boolean;
    isEditCategoryModalOpen: boolean;
    error: String | null,
}
const initialState = {
    shelfs: [],
    loading: false,
    isAddCategoryModalOpen: false,
    isEditCategoryModalOpen: false,
    error: null,
};
export const ShelfReducer: Reducer<IShelfsState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {

        case ActionType.FETCH_SHELFS_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                categories: action.payload,
                loading: false
            };

        case ActionType.FETCH_SHELFS_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case ActionType.FETCH_SHELFS:
            return {
                ...state,
                loading: true
            };

        case ActionType.ADD_SHELF_FAIL:

        case ActionType.ADD_SHELF_SUCCESS:

        case ActionType.ADD_SHELF:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
};
