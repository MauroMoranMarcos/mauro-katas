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
            
            if (!IsNormalItem(item.Name))
            {
                if (item.Quality < 50)
                {
                    item.Quality = item.Quality + 1;

                }

                DecreaseSellIn(item);
                continue;
            }

            if (item.Name == "Backstage passes to a TAFKAL80ETC concert")
            {
                if (item.Quality < 50)
                {
                    if (item.SellIn < 11)
                    {
                        item.Quality = item.Quality + 1;
                    }

                    if (item.SellIn < 6)
                    {
                        item.Quality = item.Quality + 1;
                    }
                }

                DecreaseSellIn(item);
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

    private void DecreaseSellIn(Item item)
    {
        item.SellIn = item.SellIn - 1;

        if (item.SellIn < 0)
        {
            if (item.Name != "Aged Brie")
            {
                if (item.Name != "Backstage passes to a TAFKAL80ETC concert")
                {
                    if (item.Quality > 0)
                    {
                        item.Quality = item.Quality - 1;
                    }
                }
                else
                {
                    item.Quality = item.Quality - item.Quality;
                }
            }
            else
            {
                if (item.Quality < 50)
                {
                    item.Quality = item.Quality + 1;
                }
            }
        }
    }
}