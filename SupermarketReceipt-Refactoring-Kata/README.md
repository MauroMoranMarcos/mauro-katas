# Supermarket Receipt Refactoring Kata

## Original source

This kata was created by Emily Bache.

Original repository:
https://github.com/emilybache/SupermarketReceipt-Refactoring-Kata

## My goals

- Practice refactoring techniques
- Apply Clean Code principles
- Apply SOLID principles
- Apply design patterns
- Preserve existing behaviour through automated tests
- Practice TDD

## What I practiced

- Simple factory pattern (`OfferFactory`, `BundleFactory`, `ReceiptRendererFactory`, one enum per family)
- Strategy pattern (`Offer`, `Bundle` and `ReceiptRenderer` with interchangeable implementations)
- Favor composition over inheritance (`ReceiptPrinter` delegates the layout to a `ReceiptRenderer` instead of using Template Method)
- Dependency injection (`Teller` receives its factories and `ReceiptPrinter` receives its renderer)
- Single Responsibility Principle (partial: `ShoppingCart` and `Teller` still mix several responsibilities)
- Open-Closed Principle (partial: a new offer, bundle or format only needs a new class and an enum entry, but the factory has to be edited)
- Liskov Substitution Principle
- Interface Segregation Principle
- Test-driven development for the HTML receipt

## Notes

This repository contains my personal solution and refactoring process in Typescript.
