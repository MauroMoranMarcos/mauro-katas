import { Discount } from "../Discount";
import { Product } from "../Product";
import { Offer } from "./Offer";

export class XForAmountOffer implements Offer {
    product: Product;
    private readonly amount: number;
    private readonly numberOfProducts: number;

    constructor(product: Product, amount: number, numberOfProducts: number) {
        this.product = product;
        this.amount = amount;
        this.numberOfProducts = numberOfProducts;
    }

    getProduct(): Product {
        return this.product;
    }

    private getAmount(): number {
        return this.amount;
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
        const discountTotal = unitPrice * quantity - (this.getAmount() * numberOfXs + quantity % totalProducts * unitPrice);
        return new Discount(this.getProduct(), totalProducts + " for " + this.getAmount(), discountTotal);
    }
}