import {ReceiptPrinter} from "./ReceiptPrinter";
import {ReceiptPrinterType} from "./ReceiptPrinterType";
import {TextReceiptPrinter} from "./TextReceiptPrinter";
import {HTMLReceiptPrinter} from "./HTMLReceiptPrinter";

export class ReceiptPrinterFactory {
    public static createNew(): ReceiptPrinterFactory {
        return new ReceiptPrinterFactory();
    }

    createReceiptPrinter(type: ReceiptPrinterType): ReceiptPrinter {
        const receiptPrinters: Record<ReceiptPrinterType, ReceiptPrinter> = {
            [ReceiptPrinterType.Text]: new TextReceiptPrinter(),
            [ReceiptPrinterType.HTML]: new HTMLReceiptPrinter()
        };

        if (!receiptPrinters[type]) {
            throw new Error("Unsupported receipt printer type");
        }

        return receiptPrinters[type];
    }
}