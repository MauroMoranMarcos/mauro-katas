import { Discount } from "../Discount";
import { Product } from "../Product";
import { Offer } from "./Offer";

export class XForAmountOffer implements Offer {
    product: Product;
    argument: number;
    private numberOfProducts: number;

    constructor(product: Product, argument: number, numberOfProducts: number) {
        this.product = product;
        this.argument = argument;
        this.numberOfProducts = numberOfProducts;
    }

    getProduct(): Product {
        return this.product;
    }

    private getArgument(): number {
        return this.argument;
    }

    private getNumberOfProducts(): number {
        return this.numberOfProducts;
    }

    apply(quantity: number, unitPrice: number): Discount | null {
        if (quantity < this.getNumberOfProducts()) {
            return null;
        }
        
        const totalProducts = this.getNumberOfProducts();
        const numberOfXs = Math.floor(quantity / totalProducts);
        const discountTotal = unitPrice * quantity - (this.getArgument() * numberOfXs + quantity % totalProducts * unitPrice);
        return new Discount(this.getProduct(), totalProducts + " for " + this.getArgument(), discountTotal);
    }
}