import { ProductQuantity } from "../ProductQuantity";
import { Bundle } from "./Bundle";
import { BundleType } from "./BundleType";
import { XPercentDiscountBundle } from "./XPercentDiscountBundle";

export class BundleFactory {
    public static createNew(): BundleFactory {
        return new BundleFactory();
    }

    createBundle(bundleType: BundleType, items: ProductQuantity[], argument: number): Bundle {
        const bundleDescriptions: Record<BundleType, (items: ProductQuantity[], argument: number) => Bundle> = {
            [BundleType.XPercentDiscount]: (items: ProductQuantity[], argument: number) => new XPercentDiscountBundle(items, argument)
        };

        if (!bundleDescriptions[bundleType]) {
            throw new Error("Unsupported bundle type");
        }

        return bundleDescriptions[bundleType](items, argument);
    }
}