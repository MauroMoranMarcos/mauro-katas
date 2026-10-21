import {SupermarketCatalog} from "./SupermarketCatalog"
import {OffersByProduct, ShoppingCart} from "./ShoppingCart"
import {Product} from "./Product"
import {Receipt} from "./Receipt"
import {Offer} from "./Offer"
import {SpecialOfferType} from "./SpecialOfferType"

export class Teller {

    private offers: OffersByProduct = {};

    public constructor(private readonly catalog: SupermarketCatalog ) {
    }

    public addSpecialOffer(offerType: SpecialOfferType , product: Product, argument: number): void {
        this.offers[product.name] = new Offer(offerType, product, argument);
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
            let product: Product = productQuantity.product;
            let quantity: number = productQuantity.quantity;
            let unitPrice: number = this.catalog.getUnitPrice(product);
            let price: number = quantity * unitPrice;
            receipt.addProduct(product, quantity, unitPrice, price);
        })
    }
}
