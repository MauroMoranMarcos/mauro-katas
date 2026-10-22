import { SupermarketCatalog } from "./SupermarketCatalog"
import { OffersByProduct, ShoppingCart } from "./ShoppingCart"
import { Product } from "./Product"
import { Receipt } from "./Receipt"
import { OfferFactory } from "./offers/OfferFactory"
import { SpecialOfferType } from "./SpecialOfferType"

export class Teller {

    private offerFactory: OfferFactory = OfferFactory.createNew();
    private offers: OffersByProduct = {};

    public constructor(private readonly catalog: SupermarketCatalog) {
    }

    public addSpecialOffer(offerType: SpecialOfferType, product: Product, argument: number): void {
        this.offers[product.name] = this.offerFactory.createOffer(offerType, product, argument);
    }

    public checksOutArticlesFrom(theCart: ShoppingCart): Receipt {
        const receipt = new Receipt();
        const productQuantities = theCart.getItems();
        this.addProductsToReceipt(receipt, productQuantities);
        theCart.handleOffers(receipt, this.offers, this.catalog);

        return receipt;
    }

    private addProductsToReceipt(receipt: Receipt, productQuantities: { product: Product, quantity: number }[]): void {
        productQuantities.forEach(productQuantity => {
            this.addProductToReceipt(receipt, productQuantity);
        })
    }

    private calculateProductPrice(unitPrice: number, quantity: number): number {
        return quantity * unitPrice;
    }

    private addProductToReceipt(receipt: Receipt, productQuantity: { product: Product, quantity: number }): void {
        let product: Product = productQuantity.product;
        let quantity: number = productQuantity.quantity;
        let unitPrice: number = this.catalog.getUnitPrice(product);
        let price: number = this.calculateProductPrice(unitPrice, quantity);
        receipt.addProduct(product, quantity, unitPrice, price);
    }
}
