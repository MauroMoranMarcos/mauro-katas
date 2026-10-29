import { ReceiptType } from "./ReceiptType";
import { ReceiptRenderer } from "./ReceiptRenderer";
import { TextReceiptRenderer } from "./TextReceiptRenderer";
import { HTMLReceiptRenderer } from "./HTMLReceiptRenderer";

export class ReceiptRendererFactory {

    public static createNew(): ReceiptRendererFactory {
        return new ReceiptRendererFactory();
    }

    createReceiptRenderer(receiptType: ReceiptType): ReceiptRenderer {
        const receiptRenderer: Record<ReceiptType, ReceiptRenderer> = {
            [ReceiptType.Text]: new TextReceiptRenderer(),
            [ReceiptType.HTML]: new HTMLReceiptRenderer()
        };

        if (!receiptRenderer[receiptType]) {
            throw new Error("Unsupported receipt renderer type");
        }

        return receiptRenderer[receiptType];
    }

}