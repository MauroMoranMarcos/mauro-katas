import { SpecialOfferType } from "./SpecialOfferType";
import { Product } from "./Product";
import { Offer } from "./offers/Offer";
import { ThreeForTwoOffer } from "./offers/ThreeForTwoOffer";
import { TwoForAmountOffer } from "./offers/TwoForAmountOffer";
import { TenPercentDiscountOffer } from "./offers/TenPercentDiscountOffer";
import { FiveForAmountOffer } from "./offers/FiveForAmountOffer";

export class OfferFactory {
    public static createNew(): OfferFactory {
        return new OfferFactory();
    }

    createOffer(offerType: SpecialOfferType, product: Product, argument: number): Offer {
        switch (offerType) {
            case SpecialOfferType.ThreeForTwo:
                return new ThreeForTwoOffer(product, argument);
            case SpecialOfferType.TwoForAmount:
                return new TwoForAmountOffer(product, argument);
            case SpecialOfferType.FiveForAmount:
                return new FiveForAmountOffer(product, argument);
            case SpecialOfferType.TenPercentDiscount:
                return new TenPercentDiscountOffer(product, argument);
            default:
                throw new Error("Unsupported offer type");
        }
    }
}