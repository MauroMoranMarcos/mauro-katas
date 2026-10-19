using System.Collections.Generic;

namespace GildedRoseKata;

public class GildedRose
{
    IList<Item> Items;
    private static readonly Dictionary<string, IItemQualityUpdater> _itemQualityUpdaterStrategies = GetItemQualityUpdaterStrategies();
    private static readonly IItemQualityUpdater _itemQualityUpdaterNormalItem = new ItemQualityUpdaterNormalItem();

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

            var itemQualityUpdater = GetItemQualityUpdaterConcreteStrategy(item.Name);

            itemQualityUpdater.ModifyQualityBeforeSellIn(item);

            DecreaseSellIn(item);

            itemQualityUpdater.ModifyQualityAfterSellIn(item);

            ClearInvalidQualityValue(item);
        }
    }

    private static Dictionary<string, IItemQualityUpdater> GetItemQualityUpdaterStrategies()
    {
        return new Dictionary<string, IItemQualityUpdater> {
            { "Aged Brie", new ItemQualityUpdaterAgedBrie() },
            { "Backstage passes to a TAFKAL80ETC concert", new ItemQualityUpdaterBackstagePass() },
            { "Conjured Mana Cake", new ItemQualityUpdaterConjured() },
        };
    }

    private static IItemQualityUpdater GetItemQualityUpdaterConcreteStrategy(string itemName)
    {
        if (_itemQualityUpdaterStrategies.TryGetValue(itemName, out var itemQualityUpdater))
        {
            return itemQualityUpdater;
        }

        return _itemQualityUpdaterNormalItem;
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
        if (item.Quality >= 50)
        {
            return;
        }

        if (item.SellIn < 6)
        {
            item.Quality = item.Quality + 3;
        } 
        else if (item.SellIn < 11)
        {
            item.Quality = item.Quality + 2;
        } 
        else
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
        }
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
            item.Quality = 0;
        }

        if (IsConjured(item.Name) && item.Quality > 0)
        {
            item.Quality = item.Quality - 2;
        }

        if (IsNormalItem(item.Name) && item.Quality > 0)
        {
            item.Quality = item.Quality - 1;
        }    
    }

    private void ClearInvalidQualityValue(Item item)
    {
        if (item.Quality < 0)
        {
            item.Quality = 0;
        }

        if (item.Quality > 50)
        {
            item.Quality = 50;
        }
    }
}