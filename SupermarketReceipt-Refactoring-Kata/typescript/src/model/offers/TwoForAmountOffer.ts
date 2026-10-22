import { Discount } from "../Discount";
import { Product } from "../Product";
import { Offer } from "./Offer";

export class TwoForAmountOffer implements Offer {
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
        if (quantity < 2) {
            return null;
        }
        
        const totalProducts = 2;
        const numberOfXs = Math.floor(quantity / totalProducts);
        const discountTotal = unitPrice * quantity - (this.getArgument() * numberOfXs + quantity % totalProducts * unitPrice);
        return new Discount(this.getProduct(), totalProducts + " for " + this.getArgument(), discountTotal);
    }
    
}