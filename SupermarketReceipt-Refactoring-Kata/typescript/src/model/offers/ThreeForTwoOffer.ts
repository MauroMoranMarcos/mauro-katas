import { Discount } from "../Discount";
import { Product } from "../Product";
import { Offer } from "./Offer";

export class ThreeForTwoOffer implements Offer {
    private readonly product: Product;

    constructor(product: Product) {
        this.product = product;
    }

    getProduct(): Product {
        return this.product;
    }

    apply(quantity: number, unitPrice: number): Discount | null {
        if (quantity <= 2) {
            return null;
        }

        const totalProducts = 3;
        const numberOfXs = Math.floor(quantity / totalProducts);
        const discountAmount = quantity * unitPrice - ((numberOfXs * 2 * unitPrice) + quantity % totalProducts * unitPrice);
        return new Discount(this.getProduct(), "3 for 2", discountAmount);
    }
    
}