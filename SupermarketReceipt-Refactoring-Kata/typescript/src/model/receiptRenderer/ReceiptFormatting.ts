import { ProductUnit } from "../ProductUnit";
import { ReceiptItem } from "../ReceiptItem";

export function format2Decimals(number: number): string {
    return new Intl.NumberFormat('en-UK', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

export function presentQuantity(item: ReceiptItem): string {
    return ProductUnit.Each == item.product.unit
        ? new Intl.NumberFormat('en-UK', {maximumFractionDigits: 0}).format(item.quantity)
        : new Intl.NumberFormat('en-UK', {minimumFractionDigits: 3}).format(item.quantity);
}
