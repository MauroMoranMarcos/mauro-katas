namespace GildedRoseKata
{
    public class ItemQualityUpdaterConjured : IItemQualityUpdater
    {
        private ItemQualityUpdaterConjured()
        {
        }

        public static ItemQualityUpdaterConjured CreateNew()
        {
            return new ItemQualityUpdaterConjured();
        }

        public void ModifyQualityBeforeSellIn(Item item)
        {
            if (item.Quality > 0)
            {
                item.Quality = item.Quality - 2;
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
                item.Quality = item.Quality - 2;
            }
        }
    }
}
