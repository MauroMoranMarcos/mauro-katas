using System.Collections.Generic;

namespace GildedRoseKata;

public class GildedRose
{
    IList<Item> Items;

    public GildedRose(IList<Item> Items)
    {
        this.Items = Items;
    }

    public void UpdateQuality()
    {
        foreach (Item item in Items)
        {
            if (IsSulfuras(item.Name))
            {
                continue;
            }

            ModifyQualityBeforeSellIn(item);
            DecreaseSellIn(item);
            ModifyQualityAfterSellIn(item);
        }
    }

    private void ModifyQualityBeforeSellIn(Item item)
    {
        if (IsNormalItem(item.Name))
        {
            HandleNormalItemQuality(item);
        }

        if (IsBackstagePass(item.Name))
        {
            HandleBackstagePassQuality(item);
        }

        if (IsAgedBrie(item.Name))
        {
            HandleAgedBrieQuality(item);
        }

        if (IsConjured(item.Name))
        {
            HandleConjuredItemQuality(item);
        }
    }

    private void HandleNormalItemQuality(Item item)
    {
        if (item.Quality > 0)
        {
            item.Quality = item.Quality - 1;
        }
    }

    private void HandleBackstagePassQuality(Item item)
    {
        if (item.Quality < 50)
        {
            item.Quality = item.Quality + 1;
        }

        if (item.Quality < 50 && item.SellIn < 11)
        {
            item.Quality = item.Quality + 1;
        }

        if (item.Quality < 50 && item.SellIn < 6)
        {
            item.Quality = item.Quality + 1;
        }
    }

    private void HandleAgedBrieQuality(Item item)
    {
        if (item.Quality < 50)
        {
            item.Quality = item.Quality + 1;
        }
    }

    private void HandleConjuredItemQuality(Item item)
    {
        if (item.Quality > 0)
        {
            item.Quality = item.Quality - 2;

            ClearInvalidQualityValue(item);

            return;
        }

        item.Quality = 0;
    }

    private bool IsNormalItem(string itemName)
    {
        return itemName != "Aged Brie" && itemName != "Backstage passes to a TAFKAL80ETC concert" && itemName != "Sulfuras, Hand of Ragnaros" && itemName != "Conjured Mana Cake";
    }

    private bool IsSulfuras(string itemName)
    {
        return itemName == "Sulfuras, Hand of Ragnaros";
    }

    private bool IsAgedBrie(string itemName)
    {
        return itemName == "Aged Brie";
    }

    private bool IsBackstagePass(string itemName)
    {
        return itemName == "Backstage passes to a TAFKAL80ETC concert";
    }

    private bool IsConjured(string itemName)
    {
        return itemName == "Conjured Mana Cake";
    }

    private void DecreaseSellIn(Item item)
    {
        item.SellIn = item.SellIn - 1;
    }

    private void ModifyQualityAfterSellIn(Item item)
    {
        if (item.SellIn >= 0)
        {
            return;
        }

        if (IsAgedBrie(item.Name) && item.Quality < 50)
        {
            item.Quality = item.Quality + 1;
        }

        if (IsBackstagePass(item.Name))
        {
            item.Quality = item.Quality - item.Quality;
        }

        if (IsConjured(item.Name) && item.Quality > 0)
        {
            item.Quality = item.Quality - 2;
        }

        if (IsNormalItem(item.Name) && item.Quality > 0)
        {
            item.Quality = item.Quality - 1;
        }
        
        ClearInvalidQualityValue(item);
    }

    private void ClearInvalidQualityValue(Item item)
    {
        if (item.Quality < 0)
        {
            item.Quality = 0;
        }
    }
}