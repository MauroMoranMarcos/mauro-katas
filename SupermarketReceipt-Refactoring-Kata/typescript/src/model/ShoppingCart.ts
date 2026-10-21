import {Product} from "./Product"
import {SupermarketCatalog} from "./SupermarketCatalog"
import * as _ from "lodash"
import {ProductQuantity} from "./ProductQuantity"
import {Discount} from "./Discount"
import {Receipt} from "./Receipt"
import {Offer} from "./Offer"
import {SpecialOfferType} from "./SpecialOfferType"

type ProductQuantities = { [productName: string]: ProductQuantity }
export type OffersByProduct = {[productName: string]: Offer};

export class ShoppingCart {

    private readonly  items: ProductQuantity[] = [];
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

    handleOffers(receipt: Receipt,  offers: OffersByProduct, catalog: SupermarketCatalog ):void {
        let productsWithOffers = this.getProductsWithOffers(offers);
        
        for (const productName of productsWithOffers) {

            const productQuantity = this._productQuantities[productName]
            const product = productQuantity.product;
            const quantity: number = productQuantity.quantity;
            const offer : Offer = offers[productName];
            const unitPrice: number= catalog.getUnitPrice(product);
            let quantityAsInt = quantity;
            let discount : Discount|null = null;

            if (offer.offerType == SpecialOfferType.ThreeForTwo && quantityAsInt > 2) {
                const totalProducts = 3;
                const numberOfXs = Math.floor(quantityAsInt / totalProducts);
                const discountAmount = quantity * unitPrice - ((numberOfXs * 2 * unitPrice) + quantityAsInt % totalProducts * unitPrice);
                discount = new Discount(product, "3 for 2", discountAmount);
            } 
            
            if (offer.offerType == SpecialOfferType.TwoForAmount && quantityAsInt >= 2) {
                const totalProducts = 2;
                const total = offer.argument * Math.floor(quantityAsInt / totalProducts) + quantityAsInt % totalProducts * unitPrice;
                const discountN = unitPrice * quantity - total;
                discount = new Discount(product, "2 for " + offer.argument, discountN);
            } 
            
            if (offer.offerType == SpecialOfferType.FiveForAmount && quantityAsInt >= 5) {
                const totalProducts = 5;
                const numberOfXs = Math.floor(quantityAsInt / totalProducts);
                const discountTotal = unitPrice * quantity - (offer.argument * numberOfXs + quantityAsInt % totalProducts * unitPrice);
                discount = new Discount(product, totalProducts + " for " + offer.argument, discountTotal);
            }

            if (offer.offerType == SpecialOfferType.TenPercentDiscount) {
                discount = new Discount(product, offer.argument + "% off", quantity * unitPrice * offer.argument / 100.0);
            }

            if (discount != null)
            {
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
