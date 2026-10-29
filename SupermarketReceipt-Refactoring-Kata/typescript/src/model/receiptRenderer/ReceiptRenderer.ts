export interface ReceiptRenderer {

    beginReceipt(): string
    renderItem(name: string, totalPrice: string): string
    renderItemDetail(unitPrice: string, quantity: string): string
    renderDiscount(description: string, productName: string, amount: string): string;
    renderTotal(totalPrice: string): string;
    endReceipt(): string;

}