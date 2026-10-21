import {FakeCatalog} from "./FakeCatalog"
import {Product} from "../src/model/Product"
import {SupermarketCatalog} from "../src/model/SupermarketCatalog"
import {Receipt} from "../src/model/Receipt"
import {ShoppingCart} from "../src/model/ShoppingCart"
import {Teller} from "../src/model/Teller"
import {ReceiptPrinter} from "../src/ReceiptPrinter"
import {SpecialOfferType} from "../src/model/SpecialOfferType"
import {ProductUnit} from "../src/model/ProductUnit"
import {assert} from "chai";
import { it } from "node:test"
import { describe } from "node:test"

describe('Supermarket individual discounts', () => {
    it('Ten percent discount each', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const toothbrush: Product = new Product("toothbrush", ProductUnit.Each);
        catalog.addProduct(toothbrush, 0.99);
        const apples: Product = new Product("apples", ProductUnit.Kilo);
        catalog.addProduct(apples, 1.99);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, toothbrush, 10.0);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(apples, 2.5);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 4.975, 0.01);
        assert.isEmpty(receipt.getDiscounts());
        assert.equal(receipt.getItems().length, 1);
        const receiptItem = receipt.getItems()[0];
        assert.equal(receiptItem.product, apples);
        assert.equal(receiptItem.price, 1.99);
        assert.approximately(receiptItem.totalPrice, 2.5*1.99, 0.01);
        assert.equal(receiptItem.quantity, 2.5);
    });

    it('Buy two, get one free', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const toothbrush: Product = new Product("toothbrush", ProductUnit.Each);
        catalog.addProduct(toothbrush, 0.99);
        const bananas: Product = new Product("bananas", ProductUnit.Kilo);
        catalog.addProduct(bananas, 2.99);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.ThreeForTwo, toothbrush, 0);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(toothbrush, 3);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 1.98, 0.01);
        assert.isNotEmpty(receipt.getDiscounts());
        assert.equal(receipt.getItems().length, 1);
        const receiptItem = receipt.getItems()[0];
        assert.equal(receiptItem.product, toothbrush);
        assert.equal(receiptItem.price, 0.99);
        assert.approximately(receiptItem.totalPrice, 3*0.99, 0.01);
        assert.equal(receiptItem.quantity, 3);
    });

    it('Two for amount', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const yogourt: Product = new Product("yogourt", ProductUnit.Each);
        catalog.addProduct(yogourt, 0.50);
        const avocados: Product = new Product("avocados", ProductUnit.Kilo);
        catalog.addProduct(avocados, 4.99);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.TwoForAmount, yogourt, 0.75);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(yogourt, 2);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 0.75, 0.01);
        assert.isNotEmpty(receipt.getDiscounts());
        assert.equal(receipt.getItems().length, 1);
        const receiptItem = receipt.getItems()[0];
        assert.equal(receiptItem.product, yogourt);
        assert.equal(receiptItem.price, 0.50);
        assert.approximately(receiptItem.totalPrice, 2*0.50, 0.01);
        assert.equal(receiptItem.quantity, 2);
    });

    it('Five for amount', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const cookie: Product = new Product("cookie", ProductUnit.Each);
        catalog.addProduct(cookie, 0.89);
        const potatoes: Product = new Product("potatoes", ProductUnit.Kilo);
        catalog.addProduct(potatoes, 1.99);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.FiveForAmount, cookie, 3.00);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(cookie, 5);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 3.00, 0.01);
        assert.isNotEmpty(receipt.getDiscounts());
        assert.equal(receipt.getItems().length, 1);
        const receiptItem = receipt.getItems()[0];
        assert.equal(receiptItem.product, cookie);
        assert.equal(receiptItem.price, 0.89);
        assert.approximately(receiptItem.totalPrice, 5*0.89, 0.01);
        assert.equal(receiptItem.quantity, 5);
    });
});

describe('Supermarket combined discounts', () => {
    it('Ten percent discount each and buy two get one free', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const toothbrush: Product = new Product("toothbrush", ProductUnit.Each);
        catalog.addProduct(toothbrush, 0.99);
        const toothpaste: Product = new Product("toothpaste", ProductUnit.Each);
        catalog.addProduct(toothpaste, 1.99);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, toothbrush, 10.0);
        teller.addSpecialOffer(SpecialOfferType.ThreeForTwo, toothpaste, 0);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(toothbrush, 2);
        cart.addItemQuantity(toothpaste, 3);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 1.782 + 2 * 1.99, 0.01);
        assert.isNotEmpty(receipt.getDiscounts());
        assert.equal(receipt.getItems().length, 2);

        const receiptItemToothbrush = receipt.getItems()[0];
        assert.equal(receiptItemToothbrush.price, 0.99);
        assert.approximately(receiptItemToothbrush.totalPrice, 2 * 0.99, 0.01);
        assert.equal(receiptItemToothbrush.quantity, 2);

        const receiptItemToothpaste = receipt.getItems()[1];
        assert.equal(receiptItemToothpaste.price, 1.99);
        assert.approximately(receiptItemToothpaste.totalPrice, 3 * 1.99, 0.01);
        assert.equal(receiptItemToothpaste.quantity, 3);
    });

    it('Five for amount and two for amount', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const cookie: Product = new Product("cookie", ProductUnit.Each);
        catalog.addProduct(cookie, 0.89);
        const donut: Product = new Product("donut", ProductUnit.Each);
        catalog.addProduct(donut, 0.39);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.FiveForAmount, cookie, 3.00);
        teller.addSpecialOffer(SpecialOfferType.TwoForAmount, donut, 0.50);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(cookie, 5);
        cart.addItemQuantity(donut, 2);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 3.50, 0.01);
        assert.isNotEmpty(receipt.getDiscounts());
        assert.equal(receipt.getItems().length, 2);
        const receiptItemCookie = receipt.getItems()[0];
        assert.equal(receiptItemCookie.product, cookie);
        assert.equal(receiptItemCookie.price, 0.89);
        assert.approximately(receiptItemCookie.totalPrice, 5*0.89, 0.01);
        assert.equal(receiptItemCookie.quantity, 5);

        const receiptItemDonut = receipt.getItems()[1];
        assert.equal(receiptItemDonut.product, donut);
        assert.equal(receiptItemDonut.price, 0.39);
        assert.approximately(receiptItemDonut.totalPrice, 2*0.39, 0.01);
        assert.equal(receiptItemDonut.quantity, 2);
    });

    it('Five for amount and ten percent descount each', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const cookie: Product = new Product("cookie", ProductUnit.Each);
        catalog.addProduct(cookie, 0.89);
        const toothbrush: Product = new Product("toothbrush", ProductUnit.Each);
        catalog.addProduct(toothbrush, 0.99);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.FiveForAmount, cookie, 3.00);
        teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, toothbrush, 10.0);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(cookie, 5);
        cart.addItemQuantity(toothbrush, 3);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 3.00 + 3*0.99*0.9, 0.01);
        assert.isNotEmpty(receipt.getDiscounts());
        assert.equal(receipt.getItems().length, 2);
        const receiptItemCookie = receipt.getItems()[0];
        assert.equal(receiptItemCookie.product, cookie);
        assert.equal(receiptItemCookie.price, 0.89);
        assert.approximately(receiptItemCookie.totalPrice, 5*0.89, 0.01);
        assert.equal(receiptItemCookie.quantity, 5);
        
        const receiptItemToothbrush = receipt.getItems()[1];
        assert.equal(receiptItemToothbrush.product, toothbrush);
        assert.equal(receiptItemToothbrush.price, 0.99);
        assert.approximately(receiptItemToothbrush.totalPrice, 3*0.99, 0.01);
        assert.equal(receiptItemToothbrush.quantity, 3);
    });

    it('Buy two, get one free and two for amount', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const toothbrush: Product = new Product("toothbrush", ProductUnit.Each);
        catalog.addProduct(toothbrush, 0.99);
        const tablecloth: Product = new Product("tablecloth", ProductUnit.Each);
        catalog.addProduct(tablecloth, 9.99);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.ThreeForTwo, toothbrush, 0);
        teller.addSpecialOffer(SpecialOfferType.TwoForAmount, tablecloth, 15.0);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(toothbrush, 3);
        cart.addItemQuantity(tablecloth, 2);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 15.0 + 2*0.99, 0.01);
        assert.isNotEmpty(receipt.getDiscounts());
        assert.equal(receipt.getItems().length, 2);
        const receiptItemToothbrush = receipt.getItems()[0];
        assert.equal(receiptItemToothbrush.product, toothbrush);
        assert.equal(receiptItemToothbrush.price, 0.99);
        assert.approximately(receiptItemToothbrush.totalPrice, 3*0.99, 0.01);
        assert.equal(receiptItemToothbrush.quantity, 3);

        const receiptItemTablecloth = receipt.getItems()[1];
        assert.equal(receiptItemTablecloth.product, tablecloth);
        assert.equal(receiptItemTablecloth.price, 9.99);
        assert.approximately(receiptItemTablecloth.totalPrice, 2*9.99, 0.01);
        assert.equal(receiptItemTablecloth.quantity, 2);
    });
});

describe('Supermarket offer thresholds and quantities', () => {
    it('Two for amount with an odd quantity charges the leftover at unit price', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const yogourt: Product = new Product("yogourt", ProductUnit.Each);
        catalog.addProduct(yogourt, 0.50);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.TwoForAmount, yogourt, 0.75);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(yogourt, 3);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 0.75 + 0.50, 0.01);
        assert.equal(receipt.getDiscounts().length, 1);
        assert.approximately(receipt.getDiscounts()[0].discountAmount, 0.25, 0.01);
    });

    it('Two for amount is not applied with a single unit', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const yogourt: Product = new Product("yogourt", ProductUnit.Each);
        catalog.addProduct(yogourt, 0.50);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.TwoForAmount, yogourt, 0.75);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(yogourt, 1);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 0.50, 0.01);
        assert.isEmpty(receipt.getDiscounts());
    });

    it('Three for two is not applied with fewer than three units', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const toothbrush: Product = new Product("toothbrush", ProductUnit.Each);
        catalog.addProduct(toothbrush, 0.99);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.ThreeForTwo, toothbrush, 0);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(toothbrush, 2);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 2 * 0.99, 0.01);
        assert.isEmpty(receipt.getDiscounts());
    });

    it('Three for two is applied once per complete group of three', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const toothbrush: Product = new Product("toothbrush", ProductUnit.Each);
        catalog.addProduct(toothbrush, 0.99);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.ThreeForTwo, toothbrush, 0);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(toothbrush, 7);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 5 * 0.99, 0.01);
        assert.equal(receipt.getDiscounts().length, 1);
        assert.approximately(receipt.getDiscounts()[0].discountAmount, 2 * 0.99, 0.01);
    });

    it('Five for amount is not applied with fewer than five units', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const cookie: Product = new Product("cookie", ProductUnit.Each);
        catalog.addProduct(cookie, 0.89);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.FiveForAmount, cookie, 3.00);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(cookie, 4);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 4 * 0.89, 0.01);
        assert.isEmpty(receipt.getDiscounts());
    });

    it('Five for amount charges the leftover units at unit price', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const cookie: Product = new Product("cookie", ProductUnit.Each);
        catalog.addProduct(cookie, 0.89);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.FiveForAmount, cookie, 3.00);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(cookie, 7);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 3.00 + 2 * 0.89, 0.01);
        assert.equal(receipt.getDiscounts().length, 1);
    });

    it('Ten percent discount applies to products sold by weight', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const apples: Product = new Product("apples", ProductUnit.Kilo);
        catalog.addProduct(apples, 1.99);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, apples, 10.0);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(apples, 2.5);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 2.5 * 1.99 * 0.9, 0.01);
        assert.equal(receipt.getDiscounts().length, 1);
        assert.approximately(receipt.getDiscounts()[0].discountAmount, 2.5 * 1.99 * 0.1, 0.01);
    });

    it('Quantities of the same product added separately are combined for the offer', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const toothbrush: Product = new Product("toothbrush", ProductUnit.Each);
        catalog.addProduct(toothbrush, 0.99);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.ThreeForTwo, toothbrush, 0);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItem(toothbrush);
        cart.addItemQuantity(toothbrush, 2);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.equal(receipt.getItems().length, 2);
        assert.approximately(receipt.getTotalPrice(), 2 * 0.99, 0.01);
        assert.equal(receipt.getDiscounts().length, 1);
    });

    it('The last special offer added to a product replaces the previous one', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const toothbrush: Product = new Product("toothbrush", ProductUnit.Each);
        catalog.addProduct(toothbrush, 1.00);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.ThreeForTwo, toothbrush, 0);
        teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, toothbrush, 20.0);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(toothbrush, 3);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.approximately(receipt.getTotalPrice(), 3 * 1.00 * 0.8, 0.01);
        assert.equal(receipt.getDiscounts().length, 1);
        assert.equal(receipt.getDiscounts()[0].description, "20% off");
    });

    it('Empty cart produces an empty receipt', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const teller: Teller = new Teller(catalog);
        const cart: ShoppingCart = new ShoppingCart();

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        assert.equal(receipt.getTotalPrice(), 0);
        assert.isEmpty(receipt.getItems());
        assert.isEmpty(receipt.getDiscounts());
    });
});

describe('Supermarket several offers in the same cart', () => {
    it('Every offer type in one cart, plus a product without offer', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const toothbrush: Product = new Product("toothbrush", ProductUnit.Each);
        catalog.addProduct(toothbrush, 0.99);
        const yogourt: Product = new Product("yogourt", ProductUnit.Each);
        catalog.addProduct(yogourt, 0.50);
        const cookie: Product = new Product("cookie", ProductUnit.Each);
        catalog.addProduct(cookie, 0.89);
        const apples: Product = new Product("apples", ProductUnit.Kilo);
        catalog.addProduct(apples, 2.00);
        const rice: Product = new Product("rice", ProductUnit.Each);
        catalog.addProduct(rice, 1.50);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.ThreeForTwo, toothbrush, 0);
        teller.addSpecialOffer(SpecialOfferType.TwoForAmount, yogourt, 0.75);
        teller.addSpecialOffer(SpecialOfferType.FiveForAmount, cookie, 3.00);
        teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, apples, 10.0);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(toothbrush, 3);
        cart.addItemQuantity(yogourt, 2);
        cart.addItemQuantity(cookie, 5);
        cart.addItemQuantity(apples, 1.5);
        cart.addItemQuantity(rice, 1);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);

        // ASSERT
        const expected = 2 * 0.99 + 0.75 + 3.00 + 1.5 * 2.00 * 0.9 + 1.50;
        assert.approximately(receipt.getTotalPrice(), expected, 0.01);
        assert.equal(receipt.getItems().length, 5);
        assert.equal(receipt.getDiscounts().length, 4);
    });
});

describe('Supermarket receipt printer', () => {
    it('Prints items, discounts and total', () => {
        // ARRANGE
        const catalog: SupermarketCatalog = new FakeCatalog();
        const apples: Product = new Product("apples", ProductUnit.Kilo);
        catalog.addProduct(apples, 1.99);
        const toothbrush: Product = new Product("toothbrush", ProductUnit.Each);
        catalog.addProduct(toothbrush, 0.99);

        const teller: Teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.ThreeForTwo, toothbrush, 0);

        const cart: ShoppingCart = new ShoppingCart();
        cart.addItemQuantity(apples, 2);
        cart.addItemQuantity(toothbrush, 3);

        // ACT
        const receipt: Receipt = teller.checksOutArticlesFrom(cart);
        const printed: string = new ReceiptPrinter(40).printReceipt(receipt);

        // ASSERT
        const lines = printed.split(/\r?\n/);
        assert.deepEqual(lines, [
            "apples" + " ".repeat(30) + "3.98",
            "  1.99 * 2.000",
            "toothbrush" + " ".repeat(26) + "2.97",
            "  0.99 * 3",
            "3 for 2(toothbrush)" + " ".repeat(16) + "-0.99",
            "",
            "Total: " + " ".repeat(29) + "5.96",
        ]);
    });
});
