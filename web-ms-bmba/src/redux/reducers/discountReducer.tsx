import { Reducer } from 'redux';
import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/discountActionTypes';


export interface IDiscountsState {
    // products: IProduct[];
    loading: boolean;
    isAddDiscountModalOpen: boolean;
    isEditDiscountModalOpen: boolean;
    error: String | null,
}
const initialState = {
    loading: false,
    isAddDiscountModalOpen: false,
    isEditDiscountModalOpen: false,
    error: null,
};
export const DiscountReducer: Reducer<IDiscountsState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.ADD_DISCOUNT:
            return {
                ...state,
                loading: true
            };

        case ActionType.EDIT_DISCOUNT:
            return {
                ...state,
                loading: true
            };
        case ActionType.DELETE_DISCOUNT:
            return {
                ...state,
                loading: true
            };


        case ActionType.ADD_DISCOUNT_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case ActionType.EDIT_DISCOUNT_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case ActionType.DELETE_DISCOUNT_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };




        case ActionType.ADD_DISCOUNT_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case ActionType.EDIT_DISCOUNT_SUCCESS:

            return {
                ...state,
                loading: false
            };


        case ActionType.DELETE_DISCOUNT_SUCCESS:
            return {
                ...state,
                loading: false
            };


        case ActionType.OPEN_ADD_DISCOUNT_MODAL:
            return {
                ...state,
                isAddProductModalOpen: true,
            };

        case ActionType.CLOSE_ADD_DISCOUNT_MODAL:
            return {
                ...state,
                isAddProductModalOpen: false,
            };

        case ActionType.OPEN_EDIT_DISCOUNT_MODAL:
            return {
                ...state,
                isEditProductModalOpen: true,
            };

        case ActionType.CLOSE_EDIT_DISCOUNT_MODAL:
            return {
                ...state,
                isEditProductModalOpen: false,
            };



        default:
            return state;
    }
};
