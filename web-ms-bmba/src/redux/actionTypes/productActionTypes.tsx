import { IProduct } from '../../models/product';
import { IProductsRes } from '../../models/productRes';


export enum ActionType {
    FETCH_PRODUCTS = 'FETCH_PRODUCTS',
    FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL',

    FETCH_PRODUCT = 'FETCH_PRODUCT',
    FETCH_PRODUCT_SUCCESS = 'FETCH_COMPANY_SUCCESS',
    FETCH_PRODUCT_FAIL = 'FETCH_PRODUCT_FAIL',

    OPEN_ADD_PRODUCT_MODAL = 'OPEN_ADD_PRODUCT_MODAL',
    CLOSE_ADD_PRODUCT_MODAL = 'OPEN_ADD_PRODUCT_MODAL',

    ADD_PRODUCT = 'ADD_PRODUCT',
    ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS',
    ADD_PRODUCT_FAIL = 'ADD_PRODUCT_FAIL',

    OPEN_EDIT_PRODUCT_MODAL = 'OPEN_EDIT_PRODUCT_MODAL',
    CLOSE_EDIT_PRODUCT_MODAL = 'CLOSE_EDIT_PRODUCT_MODAL',

    EDIT_PRODUCT = 'EDIT_PRODUCT',
    EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS',
    EDIT_PRODUCT_FAIL = 'EDIT_PRODUCT_FAIL',

    DELETE_PRODUCT = 'DELETE_PRODUCT',
    DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS',
    DELETE_PRODUCT_FAIL = 'DELETE_PRODUCT_FAIL'
}

export interface IFetchProducts {
    type: ActionType.FETCH_PRODUCTS;
}
export interface IFetchProductsSuccess {
    type: ActionType.FETCH_PRODUCTS_SUCCESS;
    payload: IProductsRes;
}
export interface IFetchProductsFail {
    type: ActionType.FETCH_PRODUCTS_FAIL;
    payload: String | null;
}

export interface IFetchProduct {
    type: ActionType.FETCH_PRODUCT;
}
export interface IFetchProductSuccess {
    type: ActionType.FETCH_PRODUCT_SUCCESS;
    payload: IProduct;
}
export interface IFetchProductFail {
    type: ActionType.FETCH_PRODUCT_FAIL;
    payload: String | null;
}


export interface IOpenAddProductModal {
    type: ActionType.OPEN_ADD_PRODUCT_MODAL;
}
export interface ICloseAddProductModal {
    type: ActionType.CLOSE_ADD_PRODUCT_MODAL;
}
export interface IAddProduct {
    type: ActionType.ADD_PRODUCT;
}
export interface IAddProductSuccess {
    type: ActionType.ADD_PRODUCT_SUCCESS;
    payload: IProduct;
}
export interface IAddProductFail {
    type: ActionType.ADD_PRODUCT_FAIL;
    payload: String | null;
}


export interface IOpenEditProductModal {
    type: ActionType.OPEN_EDIT_PRODUCT_MODAL;
}

export interface ICloseEditProductModal {
    type: ActionType.CLOSE_EDIT_PRODUCT_MODAL;
}
export interface IEditProduct {
    type: ActionType.EDIT_PRODUCT;
}
export interface IEditProductSuccess {
    type: ActionType.EDIT_PRODUCT_SUCCESS;
    payload: IProduct;
}
export interface IEditProductFail {
    type: ActionType.EDIT_PRODUCT_FAIL;
    payload: String | null;
}

export interface IDeleteProduct {
    type: ActionType.DELETE_PRODUCT;
}
export interface IDeleteProductSuccess {
    type: ActionType.DELETE_PRODUCT_SUCCESS;
    payload: number;
}
export interface IDeleteProductFail {
    type: ActionType.DELETE_PRODUCT_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchProducts
    | IFetchProductsSuccess
    | IFetchProductsFail
    | IFetchProduct
    | IFetchProductSuccess
    | IFetchProductFail
    | IAddProduct
    | IAddProductSuccess
    | IAddProductFail
    | IEditProduct
    | IEditProductSuccess
    | IEditProductFail
    | IDeleteProduct
    | IDeleteProductSuccess
    | IDeleteProductFail
    | ICloseAddProductModal
    | IOpenAddProductModal
    | ICloseEditProductModal
    | IOpenEditProductModal;