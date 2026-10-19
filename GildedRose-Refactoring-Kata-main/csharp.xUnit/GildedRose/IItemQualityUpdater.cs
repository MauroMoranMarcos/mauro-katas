namespace GildedRoseKata
{
    public interface IItemQualityUpdater
    {
        public void ModifyQualityBeforeSellIn(Item item);
        public void ModifyQualityAfterSellIn(Item item);
    }
}
