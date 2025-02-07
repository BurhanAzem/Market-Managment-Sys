import { IDiscount } from "../../models/discount";

export enum ActionType {

    EDIT_DISCOUNT = 'EDIT_DISCOUNT',
    EDIT_DISCOUNT_SUCCESS = 'EDIT_DISCOUNT_SUCCESS',
    EDIT_DISCOUNT_FAIL = 'EDIT_DISCOUNT_FAIL',

    ADD_DISCOUNT = 'ADD_DISCOUNT',
    ADD_DISCOUNT_SUCCESS = 'ADD_DISCOUNT_SUCCESS',
    ADD_DISCOUNT_FAIL = 'ADD_DISCOUNT_FAIL',
     
    DELETE_DISCOUNT = 'DELETE_DISCOUNT',
    DELETE_DISCOUNT_SUCCESS = 'DELETE_DISCOUNT_SUCCESS',
    DELETE_DISCOUNT_FAIL = 'DELETE_DISCOUNT_FAIL',

    OPEN_ADD_DISCOUNT_MODAL = 'OPEN_ADD_DISCOUNT_MODAL',
    CLOSE_ADD_DISCOUNT_MODAL = 'CLOSE_ADD_DISCOUNT_MODAL',

    OPEN_EDIT_DISCOUNT_MODAL = 'OPEN_EDIT_DISCOUNT_MODAL',
    CLOSE_EDIT_DISCOUNT_MODAL = 'CLOSE_EDIT_DISCOUNT_MODAL'
}



export interface IAddDiscount {
    type: ActionType.ADD_DISCOUNT;
}
export interface IAddDiscountSuccess {
    type: ActionType.ADD_DISCOUNT_SUCCESS;
    payload: IDiscount;
}
export interface IAddDiscountFail {
    type: ActionType.ADD_DISCOUNT_FAIL;
    payload: String | null;
}

export interface IEditDiscount {
    type: ActionType.EDIT_DISCOUNT;
}
export interface IEditDiscountSuccess {
    type: ActionType.EDIT_DISCOUNT_SUCCESS;
    payload: IDiscount;
}
export interface IEditDiscountFail {
    type: ActionType.EDIT_DISCOUNT_FAIL;
    payload: String | null;
}

export interface IDeleteDiscount {
    type: ActionType.DELETE_DISCOUNT;
}
export interface IDeleteDiscountSuccess {
    type: ActionType.DELETE_DISCOUNT_SUCCESS;
    payload: number;
}
export interface IDeleteDiscountFail {
    type: ActionType.DELETE_DISCOUNT_FAIL;
    payload: String | null;
}

export interface IOpenEditDiscountModal {
    type: ActionType.OPEN_EDIT_DISCOUNT_MODAL;
}

export interface ICloseEditDiscountModal {
    type: ActionType.CLOSE_EDIT_DISCOUNT_MODAL;
}

export interface IOpenAddDiscountModal {
    type: ActionType.OPEN_ADD_DISCOUNT_MODAL;
}

export interface ICloseAddDiscountModal {
    type: ActionType.CLOSE_ADD_DISCOUNT_MODAL;
}

export type Action =
    // | IFetchCompany
    // | IFetchCompanySuccess
    // | IFetchCompanyFail
    | IAddDiscount 
    | IAddDiscountSuccess
    | IAddDiscountFail
    | IEditDiscount
    | IEditDiscountSuccess
    | IEditDiscountFail
    | IDeleteDiscount
    | IDeleteDiscountSuccess
    | IDeleteDiscountFail
    | ICloseEditDiscountModal
    | IOpenEditDiscountModal
    | ICloseAddDiscountModal
    | IOpenAddDiscountModal;