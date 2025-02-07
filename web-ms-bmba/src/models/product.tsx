import { ICategory } from "./category"
import { IDiscount } from "./discount"
import { IShelf } from "./shelf"
import { ISupplier } from "./supplier"

export interface IProduct {
    supplier?: ISupplier
    supplierId?: number
    shelfDto?: IShelf
    shelfId?: number
    discountDto?: IDiscount
    discountId?: number
    categoryDto?: ICategory
    categoryId?: number
    name: string
    description?: string
    images?: File[]
    barCode: number
    currentWholeSalePurchasingPrice?: number
    currentWholeSalSellingPrice?: number
    currentRetailPurchasingPrice: number
    currentRetailSellingPrice: number
    quantityOfProductsPresentedForRetail?: number
    quantityOfProductsPresentedForWholesale?: number
    minimumQuantityOfProductsPresentedForRetail?: number
    minimumQuantityOfProductsPresentedForWholesale?: number
    createdDate?: Date
}