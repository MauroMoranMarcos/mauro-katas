import {Discount} from "./Discount"
import {Product} from "./Product"
import {ReceiptItem} from "./ReceiptItem"
import * as _ from "lodash"

export class Receipt {
    private items: ReceiptItem[] = [];
    private discounts: Discount[] = [];

    public getTotalPrice(): number {
        let total = this.getTotalItemsPrice() - this.getTotalItemsDiscount();

        return total;
    }

    public addProduct( p: Product, quantity: number, price: number, totalPrice: number): void {
        this.items.push(new ReceiptItem(p, quantity, price, totalPrice));
    }

    public getItems(): ReceiptItem[] {
        return _.clone(this.items);
    }

    public addDiscount( discount: Discount): void {
        this.discounts.push(discount);
    }

    public getDiscounts(): Discount[] {
        return this.discounts;
    }

    private getTotalItemsPrice(): number {
        let total = 0.0;

        this.items.forEach(item => {
            total += item.totalPrice;
        });

        return total;
    }

    private getTotalItemsDiscount(): number {
        let totalDiscount = 0.0;

        this.discounts.forEach(discount => {
            totalDiscount += discount.discountAmount;
        });

        return totalDiscount;
    }
}
