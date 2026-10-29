import { Discount } from "../Discount"
import { ProductQuantity } from "../ProductQuantity";
import { SupermarketCatalog } from "../SupermarketCatalog";

export type ProductQuantities = { [productName: string]: ProductQuantity }

export interface Bundle {

    apply(cartQuantities: ProductQuantities, catalog: SupermarketCatalog): Discount | null;

}