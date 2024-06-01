import { ICategory } from "../../models/category";
import { IShelf } from "../../models/shelf";


export enum ActionType {
    FETCH_SHELFS = 'FETCH_SHELFS',
    FETCH_SHELFS_SUCCESS = 'FETCH_SHELFS_SUCCESS',
    FETCH_SHELFS_FAIL = 'FETCH_SHELFS_FAIL',

    // FETCH_COMPANY = 'FETCH_COMPANY',
    // FETCH_COMPANY_SUCCESS = 'FETCH_COMPANY_SUCCESS',
    // FETCH_COMPANY_FAIL = 'FETCH_COMPANY_FAIL',

    ADD_SHELF = 'ADD_SHELF',
    ADD_SHELF_SUCCESS = 'ADD_SHELF_SUCCESS',
    ADD_SHELF_FAIL = 'ADD_SHELF_FAIL',
     
    // DELETE_COMPANY = 'DELETE_COMPANY',
    // DELETE_COMPANY_SUCCESS = 'DELETE_COMPANY_SUCCESS',
    // DELETE_COMPANY_FAIL = 'DELETE_COMPANY_FAIL'
}

export interface IFetchShelfs {
    type: ActionType.FETCH_SHELFS;
}
export interface IFetchShelfsSuccess {
    type: ActionType.FETCH_SHELFS_SUCCESS;
    payload: IShelf[];
}
export interface IFetchShelfsFail {
    type: ActionType.FETCH_SHELFS_FAIL;
    payload: String | null;
}

// export interface IFetchCompany {
//     type: ActionType.FETCH_COMPANY;
// }
// export interface IFetchCompanySuccess {
//     type: ActionType.FETCH_COMPANY_SUCCESS;
//     payload: Company;
// }
// export interface IFetchCompanyFail {
//     type: ActionType.FETCH_COMPANY_FAIL;
//     payload: String | null;
// }

export interface IAddShelf {
    type: ActionType.ADD_SHELF;
}
export interface IAddShelfSuccess {
    type: ActionType.ADD_SHELF_SUCCESS;
    payload: IShelf;
}
export interface IAddShelfFail {
    type: ActionType.ADD_SHELF_FAIL;
    payload: String | null;
}

// export interface IEditCompany {
//     type: ActionType.EDIT_COMPANY;
// }
// export interface IEditCompanySuccess {
//     type: ActionType.EDIT_COMPANY_SUCCESS;
//     payload: Company;
// }
// export interface IEditCompanyFail {
//     type: ActionType.EDIT_COMPANY_FAIL;
//     payload: String | null;
// }

// export interface IDeleteCompany {
//     type: ActionType.DELETE_COMPANY;
// }
// export interface IDeleteCompanySuccess {
//     type: ActionType.DELETE_COMPANY_SUCCESS;
//     payload: number;
// }
// export interface IDeleteCompanyFail {
//     type: ActionType.DELETE_COMPANY_FAIL;
//     payload: String | null;
// }

export type Action =
    | IFetchShelfs
    | IFetchShelfsSuccess
    | IFetchShelfsFail
    // | IFetchCompany
    // | IFetchCompanySuccess
    // | IFetchCompanyFail
    | IAddShelf 
    | IAddShelfSuccess
    | IAddShelfFail;
    // | IEditCompany
    // | IEditCompanySuccess
    // | IEditCompanyFail
    // | IDeleteCompany
    // | IDeleteCompanySuccess
    // | IDeleteCompanyFail;