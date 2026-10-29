import { Receipt } from "../Receipt";
import { ReceiptPrinter } from "./ReceiptPrinter";

export class HTMLReceiptPrinter implements ReceiptPrinter {
    printReceipt(receipt: Receipt): string {
        throw new Error("Method not implemented.");
    }
    
}