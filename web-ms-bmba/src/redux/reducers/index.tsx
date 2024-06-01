import { combineReducers } from 'redux';
import { AlertReducer, IAlertState as AlertState } from './AlertReducer';
import { AuthReducer, IAuthState as AuthState } from './authReducer';
import { CompanyReducer, ICompaniesState as CompaniesState } from './companyReducer';
import { ProductReducer, IProductsState as ProductsState } from './productReducer';
import { CategoryReducer, ICategoriesState } from './categoryReducer';
import { DiscountReducer, IDiscountsState } from './discountReducer';

// Define the interface for the product state
interface IProductsState extends ProductsState { }

interface RootStateType {
    readonly alert: AlertState;
    readonly auth: AuthState;
    readonly company: CompaniesState;
    readonly product: ProductsState;
    readonly category: ICategoriesState;
    readonly discount: IDiscountsState;

}

const rootReducer = combineReducers<RootStateType>({
    alert: AlertReducer,
    auth: AuthReducer,
    product: ProductReducer,
    category: CategoryReducer,
    company: CompanyReducer,
    discount: DiscountReducer,

});

export default rootReducer;
