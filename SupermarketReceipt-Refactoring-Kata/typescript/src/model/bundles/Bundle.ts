import { Discount } from "../Discount"
import { ProductQuantity } from "../ProductQuantity";
import { SupermarketCatalog } from "../SupermarketCatalog";

export interface Bundle {

    apply(cartQuantities: ProductQuantities, catalog: SupermarketCatalog): Discount | null;

}