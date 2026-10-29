import { SupermarketCatalog } from "./SupermarketCatalog"
import { Bundles, OffersByProduct, ShoppingCart } from "./ShoppingCart"
import { Product } from "./Product"
import { ProductQuantity } from "./ProductQuantity";
import { Receipt } from "./Receipt"
import { OfferFactory } from "./offers/OfferFactory"
import { SpecialOfferType } from "./offers/SpecialOfferType"
import { BundleFactory } from './bundles/BundleFactory';
import { BundleType } from './bundles/BundleType';

export class Teller {

    private offerFactory: OfferFactory;
    private bundleFactory: BundleFactory;
    private offers: OffersByProduct = {};
    private bundles: Bundles = [];

    public constructor(private readonly catalog: SupermarketCatalog, offerFactory: OfferFactory, bundleFactory: BundleFactory) {
        this.offerFactory = offerFactory;
        this.bundleFactory = bundleFactory;
    }

    public addSpecialOffer(offerType: SpecialOfferType, product: Product, argument: number): void {
        this.offers[product.name] = this.offerFactory.createOffer(offerType, product, argument);
    }

    public addBundle(bundleType: BundleType, items: ProductQuantity[], argument: number): void {
        this.bundles.push(this.bundleFactory.createBundle(bundleType, items, argument));
    }

    public checksOutArticlesFrom(theCart: ShoppingCart): Receipt {
        const receipt = new Receipt();
        const productQuantities = theCart.getItems();
        this.addProductsToReceipt(receipt, productQuantities);
        theCart.handleOffers(receipt, this.offers, this.catalog);
        theCart.handleBundles(receipt, this.bundles, this.catalog);

        return receipt;
    }

    private addProductsToReceipt(receipt: Receipt, productQuantities: ProductQuantity[]): void {
        productQuantities.forEach(productQuantity => {
            this.addProductToReceipt(receipt, productQuantity);
        })
    }

    private calculateProductPrice(unitPrice: number, quantity: number): number {
        return quantity * unitPrice;
    }

    private addProductToReceipt(receipt: Receipt, productQuantity: ProductQuantity): void {
        let product: Product = productQuantity.product;
        let quantity: number = productQuantity.quantity;
        let unitPrice: number = this.catalog.getUnitPrice(product);
        let price: number = this.calculateProductPrice(unitPrice, quantity);
        receipt.addProduct(product, quantity, unitPrice, price);
    }
}
