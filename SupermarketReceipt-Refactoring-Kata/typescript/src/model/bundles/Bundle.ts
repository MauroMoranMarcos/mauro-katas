import { ProductQuantities } from "../CommonTypes";
import { Discount } from "../Discount"
import { SupermarketCatalog } from "../SupermarketCatalog";

export interface Bundle {

    apply(cartQuantities: ProductQuantities, catalog: SupermarketCatalog): Discount | null;

}