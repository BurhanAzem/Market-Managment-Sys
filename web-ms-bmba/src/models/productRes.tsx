import { ICategory } from "./category"
import { IDiscount } from "./discount"
import { IProduct } from "./product"
import { IShelf } from "./shelf"
import { ISupplier } from "./supplier"

export interface IProductsRes {
    products : IProduct[];
    pageNumber: number;
    totalPages: number;
}