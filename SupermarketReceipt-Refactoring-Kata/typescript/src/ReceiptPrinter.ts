import {ProductUnit} from "./model/ProductUnit"
import {ReceiptItem} from "./model/ReceiptItem"
import {Receipt} from "./model/Receipt"

export class ReceiptPrinter {

    private readonly EOL = process.platform === "win32" ? "\r\n" : "\n";

    public constructor(private readonly columns: number = 40) {
    }

    public printReceipt( receipt: Receipt): string {
        let result = "";

        result = this.addItemsLines(result, receipt);

        result = this.addDiscountLines(result, receipt);

        result += this.EOL;
        let pricePresentation = this.format2Decimals(receipt.getTotalPrice());
        let total = "Total: ";
        let whitespace = ReceiptPrinter.getWhitespace(this.columns - total.length - pricePresentation.length);
        result += total;
        result += whitespace;
        result += pricePresentation;

        return result;
    }

    private addItemsLines(result: string, receipt: Receipt): string {
        receipt.getItems().forEach(item => {
            let name = item.product.name;
            let price = this.format2Decimals(item.totalPrice);
            let unitPrice = this.format2Decimals(item.price);
            let quantity = ReceiptPrinter.presentQuantity(item);
    
            let whitespaceSize = this.columns - name.length - price.length;
            let line = name + ReceiptPrinter.getWhitespace(whitespaceSize) + price + this.EOL;
    
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
            let pricePresentation = this.format2Decimals(discount.discountAmount);
            result += description;
            result += "(";
            result += productPresentation;
            result += ")";
            result += ReceiptPrinter.getWhitespace(this.columns - 3 - productPresentation.length - description.length - pricePresentation.length);
            result += "-";
            result += pricePresentation;
            result += this.EOL;
        });

        return result;
    }

    private format2Decimals(number: number) {
        return new Intl.NumberFormat('en-UK', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number)
    }

    private static presentQuantity( item: ReceiptItem): string  {
        return ProductUnit.Each == item.product.unit
            // TODO make sure this is the simplest way to make something similar to the java version
                ? new Intl.NumberFormat('en-UK', {maximumFractionDigits: 0}).format(item.quantity)
                : new Intl.NumberFormat('en-UK', {minimumFractionDigits: 3}).format(item.quantity);
    }

    private static getWhitespace(whitespaceSize: number): string {
        return " ".repeat(whitespaceSize);
    }
}
