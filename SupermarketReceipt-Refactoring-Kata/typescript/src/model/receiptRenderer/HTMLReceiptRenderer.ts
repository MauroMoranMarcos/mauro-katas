import { ReceiptRenderer } from "./ReceiptRenderer";

export class HTMLReceiptRenderer implements ReceiptRenderer {

    beginReceipt(): string {
        return "<table class=\"receipt\">\n"
    }
    
    renderItem(name: string, totalPrice: string): string {
        const escapedName = this.escape(name);
        return `<tr class="item"><td>${escapedName}</td><td>${totalPrice}</td></tr>\n`;
    }

    renderItemDetail(unitPrice: string, quantity: string): string {
        return `<tr class="detail"><td colspan="2">${unitPrice} * ${quantity}</td></tr>\n`;
    }

    renderDiscount(description: string, productName: string, amount: string): string {
        const label = this.escape(`${description}(${productName})`);
        return `<tr class="discount"><td>${label}</td><td>-${amount}</td></tr>\n`;
    }

    renderTotal(totalPrice: string): string {
        return `<tr class="total"><td>Total:</td><td>${totalPrice}</td></tr>\n`;
    }

    endReceipt(): string {
        return '</table>';
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