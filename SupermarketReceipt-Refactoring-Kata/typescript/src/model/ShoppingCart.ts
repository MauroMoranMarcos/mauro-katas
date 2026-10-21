import { Product } from "./Product"
import { SupermarketCatalog } from "./SupermarketCatalog"
import * as _ from "lodash"
import { ProductQuantity } from "./ProductQuantity"
import { Discount } from "./Discount"
import { Receipt } from "./Receipt"
import { Offer } from "./Offer"
import { SpecialOfferType } from "./SpecialOfferType"

type ProductQuantities = { [productName: string]: ProductQuantity }
export type OffersByProduct = { [productName: string]: Offer };

export class ShoppingCart {

    private readonly items: ProductQuantity[] = [];
    _productQuantities: ProductQuantities = {};

    getItems(): ProductQuantity[] {
        return _.clone(this.items);
    }

    addItem(product: Product): void {
        this.addItemQuantity(product, 1.0);
    }

    productQuantities(): ProductQuantities {
        return this._productQuantities;
    }

    public addItemQuantity(product: Product, quantity: number): void {
        let productQuantity = new ProductQuantity(product, quantity)
        this.items.push(productQuantity);
        let currentQuantity = this._productQuantities[product.name]
        if (currentQuantity) {
            this._productQuantities[product.name] = this.increaseQuantity(product, currentQuantity, quantity);
        } else {
            this._productQuantities[product.name] = productQuantity;
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
            let discount: Discount | null = null;

            if (offer.offerType == SpecialOfferType.ThreeForTwo && quantity > 2) {
                discount = this.createThreeForTwoOffer(product, quantity, unitPrice);
            }

            if (offer.offerType == SpecialOfferType.TwoForAmount && quantity >= 2) {
                discount = this.createXForAmountOffer(product, 2, quantity, unitPrice, offer.argument);
            }

            if (offer.offerType == SpecialOfferType.FiveForAmount && quantity >= 5) {
                discount = this.createXForAmountOffer(product, 5, quantity, unitPrice, offer.argument);
            }

            if (offer.offerType == SpecialOfferType.TenPercentDiscount) {
                discount = this.createTenPercentDiscount(product, quantity, unitPrice, offer.argument)
            }

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

    private createThreeForTwoOffer(product: Product, quantity: number, unitPrice: number): Discount {
        const totalProducts = 3;
        const numberOfXs = Math.floor(quantity / totalProducts);
        const discountAmount = quantity * unitPrice - ((numberOfXs * 2 * unitPrice) + quantity % totalProducts * unitPrice);
        return new Discount(product, "3 for 2", discountAmount);
    }

    private createXForAmountOffer(product: Product, totalProducts: number, quantity: number, unitPrice: number, offerArgument: number): Discount {
        const numberOfXs = Math.floor(quantity / totalProducts);
        const discountTotal = unitPrice * quantity - (offerArgument * numberOfXs + quantity % totalProducts * unitPrice);
        return new Discount(product, totalProducts + " for " + offerArgument, discountTotal);
    }

    private createTenPercentDiscount(product: Product, quantity: number, unitPrice: number, offerArgument: number): Discount {
        const discountAmount = quantity * unitPrice * offerArgument / 100.0;
        return new Discount(product, offerArgument + "% off", discountAmount);
    }
}
