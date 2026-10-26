import { Discount } from "../Discount";
import { Product } from "../Product";
import { Offer } from "./Offer";

export class TenPercentDiscountOffer implements Offer {
    private readonly product: Product;
    private readonly percentageDiscount: number;

    constructor(product: Product, percentageDiscount: number) {
        this.product = product;
        this.percentageDiscount = percentageDiscount;
    }

    getProduct(): Product {
        return this.product;
    }

    private getPercentageDiscount(): number {
        return this.percentageDiscount;
    }

    apply(quantity: number, unitPrice: number): Discount | null {
        if (quantity <= 0) {
            return null;
        }

        const discountAmount = quantity * unitPrice * this.getPercentageDiscount() / 100.0;
        return new Discount(this.getProduct(), this.getPercentageDiscount() + "% off", discountAmount);
    }
    
}