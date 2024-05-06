import { combineReducers } from 'redux';
import { AlertReducer, IAlertState as AlertState } from './AlertReducer';
import { AuthReducer, IAuthState as AuthState } from './authReducer';
import { CompanyReducer, ICompaniesState as CompaniesState } from './companyReducer';
import { ProductReducer, IProductsState as ProductsState } from './productReducer';

// Define the interface for the product state
interface IProductsState extends ProductsState {}

interface RootStateType {
    readonly alert: AlertState;
    readonly auth: AuthState;
    readonly companies: CompaniesState;
    readonly product: ProductsState; // Add product state here
}

const rootReducer = combineReducers<RootStateType>({
    alert: AlertReducer,
    auth: AuthReducer,
    product: ProductReducer, // Add product reducer here
    companies: CompanyReducer
});

export default rootReducer;
