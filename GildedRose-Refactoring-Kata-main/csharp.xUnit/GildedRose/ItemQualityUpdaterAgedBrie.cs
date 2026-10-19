namespace GildedRoseKata
{
    public class ItemQualityUpdaterAgedBrie : IItemQualityUpdater
    {
        private ItemQualityUpdaterAgedBrie()
        {
        }

        public static ItemQualityUpdaterAgedBrie CreateNew()
        {
            return new ItemQualityUpdaterAgedBrie();
        }

        public void ModifyQualityBeforeSellIn(Item item)
        {
            if (item.Quality < 50)
            {
                item.Quality = item.Quality + 1;
            }
        }

        public void ModifyQualityAfterSellIn(Item item)
        {
            if (item.SellIn >= 0)
            {
                return;
            }

            if (item.Quality < 50)
            {
                item.Quality = item.Quality + 1;
            }
        }
    }
}
