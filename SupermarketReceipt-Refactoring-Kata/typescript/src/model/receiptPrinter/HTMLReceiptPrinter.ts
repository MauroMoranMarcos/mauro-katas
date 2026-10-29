import { Receipt } from "../Receipt";
import { ReceiptPrinter } from "./ReceiptPrinter";
import { format2Decimals, presentQuantity } from "./ReceiptFormatting";

export class HTMLReceiptPrinter implements ReceiptPrinter {

    printReceipt(receipt: Receipt): string {
        const lines: string[] = ['<table class="receipt">'];

        receipt.getItems().forEach(item => {
            const name = this.escape(item.product.name);
            lines.push(`<tr class="item"><td>${name}</td><td>${format2Decimals(item.totalPrice)}</td></tr>`);
            if (item.quantity != 1) {
                lines.push(`<tr class="detail"><td colspan="2">${format2Decimals(item.price)} * ${presentQuantity(item)}</td></tr>`);
            }
        });

        receipt.getDiscounts().forEach(discount => {
            const label = this.escape(`${discount.description}(${discount.product.name})`);
            lines.push(`<tr class="discount"><td>${label}</td><td>-${format2Decimals(discount.discountAmount)}</td></tr>`);
        });

        lines.push(`<tr class="total"><td>Total:</td><td>${format2Decimals(receipt.getTotalPrice())}</td></tr>`);
        lines.push('</table>');

        return lines.join("\n");
    }

    private escape(text: string): string {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

}