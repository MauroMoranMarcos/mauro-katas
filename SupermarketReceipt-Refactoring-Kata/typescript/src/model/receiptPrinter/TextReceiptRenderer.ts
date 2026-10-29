import process from "process";
import { ReceiptRenderer } from "./ReceiptRenderer";

export class TextReceiptRenderer implements ReceiptRenderer {
    private readonly EOL = process.platform === "win32" ? "\r\n" : "\n";

    public constructor(private readonly columns: number = 40) {
    }
    
    beginReceipt(): string {
        return "";
    }
    
    renderItem(name: string, totalPrice: string): string {
        let whitespaceSize = this.columns - name.length - totalPrice.length;
        let line = name + this.getWhitespace(whitespaceSize) + totalPrice + this.EOL;
        return line;
    }
    
    renderItemDetail(unitPrice: string, quantity: string): string {
        return "  " + unitPrice + " * " + quantity + this.EOL;
    }

    renderDiscount(description: string, productName: string, amount: string): string {
        let productPresentation = productName;
        let pricePresentation = amount;
        let result = "";
        result += description;
        result += "(";
        result += productPresentation;
        result += ")";
        result += this.getWhitespace(this.columns - 3 - productPresentation.length - description.length - pricePresentation.length);
        result += "-";
        result += pricePresentation;
        result += this.EOL;
        return result;
    }

    renderTotal(totalPrice: string): string {
        let pricePresentation = totalPrice;
        let total = "Total: ";
        let whitespace = this.getWhitespace(this.columns - total.length - pricePresentation.length);

        let result = "";
        result += this.EOL;
        result += total;
        result += whitespace;
        result += pricePresentation;
        return result;
    }

    endReceipt(): string {
        return "";
    }

    private getWhitespace(whitespaceSize: number): string {
        return " ".repeat(whitespaceSize);
    }
    
}