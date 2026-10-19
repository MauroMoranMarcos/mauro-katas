namespace GildedRoseKata
{
    public class ItemQualityUpdaterAgedBrie : IItemQualityUpdater
    {
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
