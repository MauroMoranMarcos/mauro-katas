import {Receipt} from "../Receipt"
import {ReceiptPrinter} from "./ReceiptPrinter"
import {format2Decimals, presentQuantity} from "./ReceiptFormatting"
import process from "process";

export class TextReceiptPrinter implements ReceiptPrinter {
    private readonly EOL = process.platform === "win32" ? "\r\n" : "\n";

    public constructor(private readonly columns: number = 40) {
    }

    public printReceipt( receipt: Receipt): string {
        let result = "";

        result = this.addItemsLines(result, receipt);

        result = this.addDiscountLines(result, receipt);

        result = this.addFinalResultLines(result, receipt);

        return result;
    }

    private addItemsLines(result: string, receipt: Receipt): string {
        receipt.getItems().forEach(item => {
            let name = item.product.name;
            let price = format2Decimals(item.totalPrice);
            let unitPrice = format2Decimals(item.price);
            let quantity = presentQuantity(item);
    
            let whitespaceSize = this.columns - name.length - price.length;
            let line = name + this.getWhitespace(whitespaceSize) + price + this.EOL;
    
            if (item.quantity != 1) {
                line += "  " + unitPrice + " * " + quantity + this.EOL;
            }
            result += line;
        });

        return result;
    }

    private addDiscountLines(result: string, receipt: Receipt): string {
        receipt.getDiscounts().forEach(discount => {
            let productPresentation = discount.product.name;
            let description = discount.description;
            let pricePresentation = format2Decimals(discount.discountAmount);
            result += description;
            result += "(";
            result += productPresentation;
            result += ")";
            result += this.getWhitespace(this.columns - 3 - productPresentation.length - description.length - pricePresentation.length);
            result += "-";
            result += pricePresentation;
            result += this.EOL;
        });

        return result;
    }

    private addFinalResultLines(result: string, receipt: Receipt): string {
        let pricePresentation = format2Decimals(receipt.getTotalPrice());
        let total = "Total: ";
        let whitespace = this.getWhitespace(this.columns - total.length - pricePresentation.length);

        result += this.EOL;
        result += total;
        result += whitespace;
        result += pricePresentation;

        return result;
    }

    private getWhitespace(whitespaceSize: number): string {
        return " ".repeat(whitespaceSize);
    }
}