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

            var itemQualityUpdater = ItemQualityUpdaterFactory.GetQualityUpdater(item.Name);

            itemQualityUpdater.ModifyQualityBeforeSellIn(item);

            DecreaseSellIn(item);

            itemQualityUpdater.ModifyQualityAfterSellIn(item);

            ClearInvalidQualityValue(item);
        }
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