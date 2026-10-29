import {Receipt} from "../Receipt"

export interface ReceiptPrinter {

    printReceipt(receipt: Receipt): string;

}
