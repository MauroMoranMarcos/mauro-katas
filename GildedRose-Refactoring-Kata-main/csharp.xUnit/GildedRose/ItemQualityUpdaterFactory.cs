using System.Collections.Generic;

namespace GildedRoseKata
{
    public static class ItemQualityUpdaterFactory
    {
        private static readonly Dictionary<string, IItemQualityUpdater> _itemQualityUpdaters = new()
        {
            { "Aged Brie", ItemQualityUpdaterAgedBrie.CreateNew() },
            { "Backstage passes to a TAFKAL80ETC concert", ItemQualityUpdaterBackstagePass.CreateNew() },
            { "Conjured Mana Cake", ItemQualityUpdaterConjured.CreateNew() },
        };

        private static readonly IItemQualityUpdater _defaultItemQualityUpdater = ItemQualityUpdaterNormalItem.CreateNew();

        public static IItemQualityUpdater GetQualityUpdater(string itemName)
        {
            if (_itemQualityUpdaters.TryGetValue(itemName, out var itemQualityUpdater))
            {
                return itemQualityUpdater;
            }

            return _defaultItemQualityUpdater;
        }
    }
}
