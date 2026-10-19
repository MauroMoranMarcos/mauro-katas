namespace GildedRoseKata
{
    public class ItemQualityUpdaterBackstagePass : IItemQualityUpdater
    {
        private ItemQualityUpdaterBackstagePass()
        {
        }

        public static ItemQualityUpdaterBackstagePass CreateNew()
        {
            return new ItemQualityUpdaterBackstagePass();
        }

        public void ModifyQualityBeforeSellIn(Item item)
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

        public void ModifyQualityAfterSellIn(Item item)
        {
            if (item.SellIn >= 0)
            {
                return;
            }

            item.Quality = 0;
        }
    }
}
