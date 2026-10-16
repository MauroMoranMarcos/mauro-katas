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

            if (IsNormalItem(item.Name))
            {
                if (item.Quality > 0)
                {
                    item.Quality = item.Quality - 1;
                }

                DecreaseSellIn(item);
                continue;
            }
            
            if (IsBackstagePass(item.Name))
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

                DecreaseSellIn(item);
                continue;
            }

            if (IsAgedBrie(item.Name))
            {
                if (item.Quality < 50)
                {
                    item.Quality = item.Quality + 1;
                }

                DecreaseSellIn(item);
                continue;
            }
        }
    }

    private bool IsNormalItem(string itemName)
    {
        return itemName != "Aged Brie" && itemName != "Backstage passes to a TAFKAL80ETC concert" && itemName != "Sulfuras, Hand of Ragnaros";
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

    private void DecreaseSellIn(Item item)
    {
        item.SellIn = item.SellIn - 1;

        if (item.SellIn < 0)
        {
            if (IsAgedBrie(item.Name))
            {
                if (item.Quality < 50)
                {
                    item.Quality = item.Quality + 1;
                }

                return;
            }

            if (IsBackstagePass(item.Name))
            {
                item.Quality = item.Quality - item.Quality;
                return;
            }

            if (item.Quality > 0)
            {
                item.Quality = item.Quality - 1;
            }
        }
    }
}