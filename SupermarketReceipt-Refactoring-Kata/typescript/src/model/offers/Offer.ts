import { Discount } from "../Discount";
import {Product} from "../Product"

export interface Offer {

    readonly product: Product;
    readonly argument: number;

    getProduct(): Product;

    apply(quantity: number, unitPrice: number): Discount | null;

}
