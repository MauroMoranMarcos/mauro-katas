import { Product } from "./Product"
import { SupermarketCatalog } from "./SupermarketCatalog"
import * as _ from "lodash"
import { ProductQuantity } from "./ProductQuantity"
import { Discount } from "./Discount"
import { Receipt } from "./Receipt"
import { Offer } from "./offers/Offer"

type ProductQuantities = { [productName: string]: ProductQuantity }
export type OffersByProduct = { [productName: string]: Offer };

export class ShoppingCart {

    private readonly items: ProductQuantity[] = [];
    private _productQuantities: ProductQuantities = {};

    getItems(): ProductQuantity[] {
        return _.clone(this.items);
    }

    addItem(product: Product): void {
        this.addItemQuantity(product, 1.0);
    }

    productQuantities(): ProductQuantities {
        return this._productQuantities;
    }

    private setProductQuantity(productName: string, productQuantity: ProductQuantity): void {
        this._productQuantities[productName] = productQuantity;
    }

    public addItemQuantity(product: Product, quantity: number): void {
        let productQuantity = new ProductQuantity(product, quantity)
        this.items.push(productQuantity);
        this.updateProductQuantities(product, quantity, productQuantity);
    }

    private updateProductQuantities(product: Product, quantity: number, productQuantity: ProductQuantity): void {
        let currentQuantity = this.productQuantities()[product.name];
        if (currentQuantity) {
            this.setProductQuantity(product.name, this.increaseQuantity(product, currentQuantity, quantity));
        } else {
            this.setProductQuantity(product.name, productQuantity);
        }
    }

    private increaseQuantity(product: Product, productQuantity: ProductQuantity, quantity: number) {
        return new ProductQuantity(product, productQuantity.quantity + quantity)
    }

    handleOffers(receipt: Receipt, offers: OffersByProduct, catalog: SupermarketCatalog): void {
        let productsWithOffers = this.getProductsWithOffers(offers);

        for (const productName of productsWithOffers) {
            const productQuantity = this._productQuantities[productName]
            const product = productQuantity.product;
            const quantity: number = productQuantity.quantity;
            const offer: Offer = offers[productName];
            const unitPrice: number = catalog.getUnitPrice(product);
            
            const discount: Discount | null = offer.apply(quantity, unitPrice);

            if (discount != null) {
                receipt.addDiscount(discount);
            }
        }
    }

    private getProductsWithOffers(offers: OffersByProduct): string[] {
        return Object.keys(this.productQuantities()).filter((productName) => this.productHasOffer(productName, offers));
    }

    private productHasOffer(productName: string, offers: OffersByProduct): boolean {
        return offers[productName] !== undefined;
    }
}
