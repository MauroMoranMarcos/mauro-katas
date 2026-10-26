import { Discount } from "../Discount";

export interface Offer {

    apply(quantity: number, unitPrice: number): Discount | null;

}
