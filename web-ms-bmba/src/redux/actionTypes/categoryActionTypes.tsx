import { ICategory } from "../../models/category";


export enum ActionType {
    FETCH_CATEGORIES = 'FETCH_CATEGORIES',
    FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAIL = 'FETCH_CATEGORIES_FAIL',

    // FETCH_COMPANY = 'FETCH_COMPANY',
    // FETCH_COMPANY_SUCCESS = 'FETCH_COMPANY_SUCCESS',
    // FETCH_COMPANY_FAIL = 'FETCH_COMPANY_FAIL',

    ADD_CATEGORY = 'ADD_CATEGORY',
    ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS',
    ADD_CATEGORY_FAIL = 'ADD_CATEGORY_FAIL',
     
    // DELETE_COMPANY = 'DELETE_COMPANY',
    // DELETE_COMPANY_SUCCESS = 'DELETE_COMPANY_SUCCESS',
    // DELETE_COMPANY_FAIL = 'DELETE_COMPANY_FAIL'
}

export interface IFetchCategories {
    type: ActionType.FETCH_CATEGORIES;
}
export interface IFetchCategoriesSuccess {
    type: ActionType.FETCH_CATEGORIES_SUCCESS;
    payload: ICategory[];
}
export interface IFetchCategoriesFail {
    type: ActionType.FETCH_CATEGORIES_FAIL;
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

export interface IAddCategory {
    type: ActionType.ADD_CATEGORY;
}
export interface IAddCategorySuccess {
    type: ActionType.ADD_CATEGORY_SUCCESS;
    payload: ICategory;
}
export interface IAddCategoryFail {
    type: ActionType.ADD_CATEGORY_FAIL;
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
    | IFetchCategories
    | IFetchCategoriesSuccess
    | IFetchCategoriesFail
    // | IFetchCompany
    // | IFetchCompanySuccess
    // | IFetchCompanyFail
    | IAddCategory
    | IAddCategorySuccess
    | IAddCategoryFail;
    // | IEditCompany
    // | IEditCompanySuccess
    // | IEditCompanyFail
    // | IDeleteCompany
    // | IDeleteCompanySuccess
    // | IDeleteCompanyFail;