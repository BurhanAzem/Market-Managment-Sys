import { ISupplier } from "../../models/supplier";


export enum ActionType {
    FETCH_SUPPLIERS = 'FETCH_SUPPLIERS',
    FETCH_SUPPLIERS_SUCCESS = 'FETCH_SUPPLIERS_SUCCESS',
    FETCH_SUPPLIERS_FAIL = 'FETCH_SUPPLIERS_FAIL',
    FETCH_SUPPLIER = 'FETCH_SUPPLIER',
    FETCH_SUPPLIER_SUCCESS = 'FETCH_SUPPLIER_SUCCESS',
    FETCH_SUPPLIER_FAIL = 'FETCH_SUPPLIER_FAIL',
    ADD_SUPPLIER = 'ADD_SUPPLIER',
    ADD_SUPPLIER_SUCCESS = 'ADD_SUPPLIER_SUCCESS',
    ADD_SUPPLIER_FAIL = 'ADD_SUPPLIER_FAIL',
    EDIT_SUPPLIER = 'EDIT_SUPPLIER',
    EDIT_SUPPLIER_SUCCESS = 'EDIT_SUPPLIER_SUCCESS',
    EDIT_SUPPLIER_FAIL = 'EDIT_SUPPLIER_FAIL',
    DELETE_SUPPLIER = 'DELETE_SUPPLIER',
    DELETE_SUPPLIER_SUCCESS = 'DELETE_SUPPLIER_SUCCESS',
    DELETE_SUPPLIER_FAIL = 'DELETE_SUPPLIER_FAIL'
}

export interface IFetchSuppliers {
    type: ActionType.FETCH_SUPPLIERS;
}
export interface IFetchSuppliersSuccess {
    type: ActionType.FETCH_SUPPLIERS_SUCCESS;
    payload: ISupplier[];
}
export interface IFetchSuppliersFail {
    type: ActionType.FETCH_SUPPLIERS_FAIL;
    payload: String | null;
}

export interface IFetchSupplier {
    type: ActionType.FETCH_SUPPLIER;
}
export interface IFetchSupplierSuccess {
    type: ActionType.FETCH_SUPPLIER_SUCCESS;
    payload: ISupplier;
}
export interface IFetchSupplierFail {
    type: ActionType.FETCH_SUPPLIER_FAIL;
    payload: String | null;
}

export interface IAddSupplier {
    type: ActionType.ADD_SUPPLIER;
}
export interface IAddSupplierSuccess {
    type: ActionType.ADD_SUPPLIER_SUCCESS;
    payload: ISupplier;
}
export interface IAddSupplierFail {
    type: ActionType.ADD_SUPPLIER_FAIL;
    payload: String | null;
}

export interface IEditSupplier {
    type: ActionType.EDIT_SUPPLIER;
}
export interface IEditSupplierSuccess {
    type: ActionType.EDIT_SUPPLIER_SUCCESS;
    payload: ISupplier;
}
export interface IEditSupplierFail {
    type: ActionType.EDIT_SUPPLIER_FAIL;
    payload: String | null;
}

export interface IDeleteSupplier {
    type: ActionType.DELETE_SUPPLIER;
}
export interface IDeleteSupplierSuccess {
    type: ActionType.DELETE_SUPPLIER_SUCCESS;
    payload: number;
}
export interface IDeleteSupplierFail {
    type: ActionType.DELETE_SUPPLIER_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchSuppliers
    | IFetchSuppliersSuccess
    | IFetchSuppliersFail
    | IFetchSupplier
    | IFetchSupplierSuccess
    | IFetchSupplierFail
    | IAddSupplier
    | IAddSupplierSuccess
    | IAddSupplierFail
    | IEditSupplier
    | IEditSupplierSuccess
    | IEditSupplierFail
    | IDeleteSupplier
    | IDeleteSupplierSuccess
    | IDeleteSupplierFail;