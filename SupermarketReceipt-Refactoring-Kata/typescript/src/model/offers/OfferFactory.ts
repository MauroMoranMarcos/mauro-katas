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
        const offerDescriptions: Record<SpecialOfferType, (product: Product, argument: number) => Offer> = {
            [SpecialOfferType.ThreeForTwo]: (product: Product, argument: number) => new ThreeForTwoOffer(product),
            [SpecialOfferType.TwoForAmount]: (product: Product, argument: number) => new XForAmountOffer(product, argument, 2),
            [SpecialOfferType.FiveForAmount]: (product: Product, argument: number) => new XForAmountOffer(product, argument, 5),
            [SpecialOfferType.TenPercentDiscount]: (product: Product, argument: number) => new TenPercentDiscountOffer(product, argument)
        };

        if (!offerDescriptions[offerType]) {
            throw new Error("Unsupported offer type");
        }
        
        return offerDescriptions[offerType](product, argument);
    }
}