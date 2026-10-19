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

    private bool IsSulfuras(string itemName)
    {
        return itemName == "Sulfuras, Hand of Ragnaros";
    }

    private void DecreaseSellIn(Item item)
    {
        item.SellIn = item.SellIn - 1;
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