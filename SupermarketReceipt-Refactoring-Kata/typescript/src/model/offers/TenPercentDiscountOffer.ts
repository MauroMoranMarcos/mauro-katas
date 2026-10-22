import { Discount } from "../Discount";
import { Product } from "../Product";
import { Offer } from "./Offer";

export class TenPercentDiscountOffer implements Offer {
    product: Product;
    argument: number;

    constructor(product: Product, argument: number) {
        this.product = product;
        this.argument = argument;
    }

    getProduct(): Product {
        return this.product;
    }

    private getArgument(): number {
        return this.argument;
    }

    apply(quantity: number, unitPrice: number): Discount | null {
        if (quantity <= 0) {
            return null;
        }
        
        const discountAmount = quantity * unitPrice * this.getArgument() / 100.0;
        return new Discount(this.getProduct(), this.getArgument() + "% off", discountAmount);
    }
    
}