import { SpecialOfferType } from "../SpecialOfferType";
import { Product } from "../Product";
import { Offer } from "./Offer";
import { ThreeForTwoOffer } from "./ThreeForTwoOffer";
import { TenPercentDiscountOffer } from "./TenPercentDiscountOffer";
import { XForAmountOffer } from "./XForAmountOffer";

export class OfferFactory {
    public static createNew(): OfferFactory {
        return new OfferFactory();
    }

    createOffer(offerType: SpecialOfferType, product: Product, argument: number): Offer {
        switch (offerType) {
            case SpecialOfferType.ThreeForTwo:
                return new ThreeForTwoOffer(product, argument);
            case SpecialOfferType.TwoForAmount:
                return new XForAmountOffer(product, argument, 2);
            case SpecialOfferType.FiveForAmount:
                return new XForAmountOffer(product, argument, 5);
            case SpecialOfferType.TenPercentDiscount:
                return new TenPercentDiscountOffer(product, argument);
            default:
                throw new Error("Unsupported offer type");
        }
    }
}