namespace GildedRoseKata
{
    public class ItemQualityUpdaterNormalItem : IItemQualityUpdater
    {
        private ItemQualityUpdaterNormalItem()
        {
        }

        public static ItemQualityUpdaterNormalItem CreateNew()
        {
            return new ItemQualityUpdaterNormalItem();
        }

        public void ModifyQualityBeforeSellIn(Item item)
        {
            if (item.Quality > 0)
            {
                item.Quality = item.Quality - 1;
            }
        }

        public void ModifyQualityAfterSellIn(Item item)
        {
            if (item.SellIn >= 0)
            {
                return;
            }

            if (item.Quality > 0)
            {
                item.Quality = item.Quality - 1;
            }
        }
    }
}
