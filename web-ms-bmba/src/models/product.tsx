import { ICategory } from "./category"
import { IDiscount } from "./discount"
import { IShelf } from "./shelf"
import { ISupplier } from "./supplier"

export interface IProduct {
    Supplier: ISupplier
    SupplierId: number
    Shelf: IShelf
    ShelfId: number
    Discount: IDiscount
    DiscountId: number
    Category: ICategory
    CategoryId: number
    Name: string
    Description: string
    ImagePath: string
    BarCode: number
    CurrentWholeSalePurchasingPrice: number
    CurrentWholeSalSellingPrice: number
    CurrentRetailPurchasingPrice: number
    CurrentRetailSellingPrice: number
    QuantityOfProductsPresentedForRetail: number
    QuantityOfProductsPresentedForWholesale: number
    MinimumQuantityOfProductsPresentedForRetail: number
    MinimumQuantityOfProductsPresentedForWholesale: number
    CreatedDate: Date
}