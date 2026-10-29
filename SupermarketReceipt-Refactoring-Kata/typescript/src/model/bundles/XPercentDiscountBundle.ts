import { Discount } from "../Discount";
import { Product } from "../Product";
import { ProductQuantity } from "../ProductQuantity";
import { ProductUnit } from "../ProductUnit";
import { SupermarketCatalog } from "../SupermarketCatalog";
import { Bundle } from "./Bundle";
import { ProductQuantities } from "../CommonTypes";

export class XPercentDiscountBundle implements Bundle {

    private readonly items: ProductQuantity[];
    private readonly percentageDiscount: number;

    constructor(items: ProductQuantity[], percentageDiscount: number) {
        if (items.length === 0) {
            throw new Error("A bundle needs at least one product");
        }
        this.items = items;
        this.percentageDiscount = percentageDiscount;
    }

    apply(cartQuantities: ProductQuantities, catalog: SupermarketCatalog): Discount | null {
        const completeBundles = this.countCompleteBundles(cartQuantities);
        if (completeBundles === 0) {
            return null;
        }

        const discountAmount = completeBundles * this.bundlePrice(catalog) * this.percentageDiscount / 100.0;
        return new Discount(this.asProduct(), this.percentageDiscount + "% off", discountAmount);
    }

    private countCompleteBundles(cartQuantities: ProductQuantities): number {
        const bundlesPerItem = this.items.map(item => {
            const inCart = cartQuantities[item.product.name]?.quantity ?? 0;
            return Math.floor(inCart / item.quantity);
        });
        return Math.min(...bundlesPerItem);
    }

    private bundlePrice(catalog: SupermarketCatalog): number {
        return this.items.reduce((total, item) => total + item.quantity * catalog.getUnitPrice(item.product), 0);
    }

    private asProduct(): Product {
        return new Product(this.items.map(item => item.product.name).join(" + "), ProductUnit.Each);
    }

}