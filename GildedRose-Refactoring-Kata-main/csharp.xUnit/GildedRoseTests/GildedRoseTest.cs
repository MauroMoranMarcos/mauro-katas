using Xunit;
using System.Collections.Generic;
using GildedRoseKata;

namespace GildedRoseTests;

public class GildedRoseTest
{
    [Fact]
    public void foo()
    {
        IList<Item> Items = new List<Item> { new Item { Name = "foo", SellIn = 0, Quality = 0 } };
        GildedRose app = new GildedRose(Items);
        app.UpdateQuality();
        Assert.Equal("foo", Items[0].Name);
    }

    [Fact]
    public void ItemQualityDegradesNormalPath()
    {
        IList<Item> Items = new List<Item>();
        Items.Add(new Item { Name = "foo", SellIn = 5, Quality = 10 });

        GildedRose app = new GildedRose(Items);
        app.UpdateQuality();

        Assert.Equal(9, Items[0].Quality);
    }

    [Fact]
    public void QualityDegradesTwiceAsFastSellDatePassed()
    {
        IList<Item> Items = new List<Item>();
        Items.Add(new Item { Name = "foo", SellIn = 0, Quality = 10 });

        GildedRose app = new GildedRose(Items);
        app.UpdateQuality();

        Assert.Equal(8, Items[0].Quality);
    }

    [Fact]
    public void ItemQualityNeverNegative()
    {
        IList<Item> Items = new List<Item>();
        Items.Add(new Item { Name = "foo", SellIn = 2, Quality = 0 });

        GildedRose app = new GildedRose(Items);
        app.UpdateQuality();

        Assert.Equal(0, Items[0].Quality);
    }

    [Fact]
    public void AgedBrieIncreasesInQuality()
    {
        IList<Item> Items = new List<Item>();
        Items.Add(new Item { Name = "Aged Brie", SellIn = 2, Quality = 0 });

        GildedRose app = new GildedRose(Items);
        app.UpdateQuality();

        Assert.Equal(1, Items[0].Quality);
    }

    [Fact]
    public void ItemQualityNeverAboveFifty()
    {
        IList<Item> Items = new List<Item>();
        Items.Add(new Item { Name = "Aged Brie", SellIn = 2, Quality = 50 });
        Items.Add(new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 19, Quality = 50 });

        GildedRose app = new GildedRose(Items);
        app.UpdateQuality();

        Assert.Equal(50, Items[0].Quality);
        Assert.Equal(50, Items[1].Quality);
    }

    [Fact]
    public void SulfurasNeverAltersQuality()
    {
        IList<Item> Items = new List<Item>();
        Items.Add(new Item { Name = "Sulfuras, Hand of Ragnaros", SellIn = 2, Quality = 80 });

        GildedRose app = new GildedRose(Items);
        app.UpdateQuality();

        Assert.Equal(80, Items[0].Quality);
    }

    [Fact]
    public void SulfurasNeverHasToBeSoldOrDecreasesInQuality()
    {
        IList<Item> Items = new List<Item>();
        Items.Add(new Item { Name = "Sulfuras, Hand of Ragnaros", SellIn = 0, Quality = 80 });

        GildedRose app = new GildedRose(Items);
        app.UpdateQuality();

        Assert.Equal(80, Items[0].Quality);
        Assert.Equal(0, Items[0].SellIn);
    }

    [Fact]
    public void BackStagePassesIncreasesQualityByTwoWhenBetweenTenAndSixDays()
    {
        IList<Item> Items = new List<Item>();
        Items.Add(new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 9, Quality = 20 });

        GildedRose app = new GildedRose(Items);
        app.UpdateQuality();

        Assert.Equal(22, Items[0].Quality);
    }

    [Fact]
    public void BackStagePassesIncreasesQualityByThreeWhenBetweenFiveAndZeroDays()
    {
        IList<Item> Items = new List<Item>();
        Items.Add(new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 2, Quality = 20 });

        GildedRose app = new GildedRose(Items);
        app.UpdateQuality();

        Assert.Equal(23, Items[0].Quality);
    }

    [Fact]
    public void BackStagePassesDropsQualityToZeroWhenNegativeDays()
    {
        IList<Item> Items = new List<Item>();
        Items.Add(new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = -5, Quality = 20 });

        GildedRose app = new GildedRose(Items);
        app.UpdateQuality();

        Assert.Equal(0, Items[0].Quality);
    }

    [Fact]
    public void ConjuredItemsDegradeQualityTwiceAsFast()
    {
        IList<Item> Items = new List<Item>();
        Items.Add(new Item { Name = "Conjured Mana Cake", SellIn = 5, Quality = 10 });

        GildedRose app = new GildedRose(Items);
        app.UpdateQuality();

        Assert.Equal(8, Items[0].Quality);
    }

    [Fact]
    public void ConjuredItemsDegradeQualityTwiceAsFastAfterSellin()
    {
        IList<Item> Items = new List<Item>();
        Items.Add(new Item { Name = "Conjured Mana Cake", SellIn = -1, Quality = 10 });

        GildedRose app = new GildedRose(Items);
        app.UpdateQuality();

        Assert.Equal(6, Items[0].Quality);
    }
}