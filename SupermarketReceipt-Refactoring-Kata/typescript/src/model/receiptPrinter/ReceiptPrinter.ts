import { Receipt } from "../Receipt";
import { format2Decimals, presentQuantity } from "./ReceiptFormatting";
import { ReceiptType } from "./ReceiptType";
import { ReceiptRendererFactory } from "./ReceiptRendererFactory";

export class ReceiptPrinter {
    private readonly receiptRendererFactory: ReceiptRendererFactory;

    constructor(receiptRendererFactory: ReceiptRendererFactory) {
        this.receiptRendererFactory = receiptRendererFactory;
    }

    printReceipt(receiptType: ReceiptType, receipt: Receipt): string {
        let receiptOutput = "";
        const receiptRenderer = this.receiptRendererFactory.createReceiptRenderer(receiptType);

        receiptOutput += receiptRenderer.beginReceipt();
        
        receipt.getItems().forEach(item => {
            let name = item.product.name;
            let totalPrice = format2Decimals(item.totalPrice);
            let unitPrice = format2Decimals(item.price);
            let quantity = presentQuantity(item);
            receiptOutput += receiptRenderer.renderItem(name, totalPrice);

            if (item.quantity != 1) {
                receiptOutput += receiptRenderer.renderItemDetail(unitPrice, quantity);
            }
        });

        receipt.getDiscounts().forEach(discount => {
            let productPresentation = discount.product.name;
            let description = discount.description;
            let pricePresentation = format2Decimals(discount.discountAmount);
            receiptOutput += receiptRenderer.renderDiscount(description, productPresentation, pricePresentation);
        });

        let pricePresentation = format2Decimals(receipt.getTotalPrice());
        receiptOutput += receiptRenderer.renderTotal(pricePresentation);
        receiptOutput += receiptRenderer.endReceipt();

        return receiptOutput;
    }
}