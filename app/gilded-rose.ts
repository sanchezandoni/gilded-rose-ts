export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }
    
    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            var currentItem = this.items[i]

            switch(currentItem.name){
                case 'Aged Brie':
                    updateQualityForAgedBrie(currentItem);
                    break
                case 'Backstage passes to a TAFKAL80ETC concert':
                    updateQualityForBackstage(currentItem)
                    break
                case 'Sulfuras, Hand of Ragnaros':
                    updateQualityForSulfuras(currentItem)
                    break
                default:
                    updateQualityForOtherItems(currentItem)
                    break
            }
        }
        return this.items;
    }
}

function updateQualityForOtherItems(item:Item){
    if (!itemHasReachedMinimumQuality(item)) {
        if(itemHasReachedSellTime(item)){
            item.quality = item.quality - 2
        }else{
            item.quality = item.quality - 1
        }
    }
    
    item.sellIn = item.sellIn - 1;
}

function updateQualityForAgedBrie(item:Item){
    if (!itemHasReachedMaxQuality(item)) {
        if (item.sellIn <= 0) item.quality = item.quality + 2
        else item.quality = item.quality + 1
    }
    item.sellIn = item.sellIn - 1;
}

function updateQualityForSulfuras(item:Item){
    //no modifica su fecha de venta ni se degrada en calidad
    //por lo tanto esta función no hace nada
}

function updateQualityForBackstage(item:Item){
    if (!itemHasReachedMaxQuality(item)) {
        if (concertDateIsImminent(item)) {
            item.quality = item.quality + 3
        }else if (concertDateIsNear(item)) {
            item.quality = item.quality + 2
        }else{
            item.quality = item.quality + 1
        }
    }
    if (item.sellIn <= 0) {
        item.quality = item.quality - item.quality
    }
    item.sellIn = item.sellIn - 1;

    function concertDateIsImminent(item:Item):Boolean{
        return (item.sellIn < 6)
    }

    function concertDateIsNear(item:Item):Boolean{
        return (item.sellIn < 11)
    }
}

function itemHasReachedSellTime(item:Item):Boolean{
    return item.sellIn === 0
}

function itemHasReachedMinimumQuality(item:Item):Boolean{
    return item.quality === 0
}

function itemHasReachedMaxQuality(item:Item):Boolean{
    const MAX_QUALITY = 50;
    return (item.quality >= MAX_QUALITY)
}