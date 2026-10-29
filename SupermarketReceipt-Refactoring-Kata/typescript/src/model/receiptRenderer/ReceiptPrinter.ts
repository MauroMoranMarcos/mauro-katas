import { Receipt } from "../Receipt";
import { format2Decimals, presentQuantity } from "./ReceiptFormatting";
import { ReceiptRenderer } from "./ReceiptRenderer";

export class ReceiptPrinter {
    private readonly receiptRenderer: ReceiptRenderer;

    constructor(receiptRenderer: ReceiptRenderer) {
        this.receiptRenderer = receiptRenderer;
    }

    printReceipt(receipt: Receipt): string {
        let receiptOutput = "";
        
        receiptOutput += this.receiptRenderer.beginReceipt();
        
        receipt.getItems().forEach(item => {
            let name = item.product.name;
            let totalPrice = format2Decimals(item.totalPrice);
            let unitPrice = format2Decimals(item.price);
            let quantity = presentQuantity(item);
            receiptOutput += this.receiptRenderer.renderItem(name, totalPrice);

            if (item.quantity != 1) {
                receiptOutput += this.receiptRenderer.renderItemDetail(unitPrice, quantity);
            }
        });

        receipt.getDiscounts().forEach(discount => {
            let productPresentation = discount.product.name;
            let description = discount.description;
            let pricePresentation = format2Decimals(discount.discountAmount);
            receiptOutput += this.receiptRenderer.renderDiscount(description, productPresentation, pricePresentation);
        });

        let pricePresentation = format2Decimals(receipt.getTotalPrice());
        receiptOutput += this.receiptRenderer.renderTotal(pricePresentation);
        receiptOutput += this.receiptRenderer.endReceipt();

        return receiptOutput;
    }
}