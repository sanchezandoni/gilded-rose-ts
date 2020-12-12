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
        this.items = this.items.map(updateQualityByProductType)
        return this.items;
    }
}

function updateQualityByProductType(currentItem:Item):Item {
    var updatedItem:Item
    switch(currentItem.name){
        case 'Aged Brie':
            updatedItem = updateQualityForAgedBrie(currentItem)
            break
        case 'Backstage passes to a TAFKAL80ETC concert':
            updatedItem = updateQualityForBackstage(currentItem)
            break
        case 'Sulfuras, Hand of Ragnaros':
            updatedItem = updateQualityForSulfuras(currentItem)
            break
        default:
            updatedItem = updateQualityForOtherItems(currentItem)
            break
    }
    return updatedItem
}

function updateQualityForOtherItems(item:Item): Item{
    let newItem = new Item(item.name, item.sellIn, item.quality)
    if (!hasReachedMinimumQuality(item)) {
        if(hasReachedSellTime(item)){
            newItem.quality = item.quality - 2
        }else{
            newItem.quality = item.quality - 1
        }
    }
    
    newItem.sellIn = item.sellIn - 1;

    return newItem
}

function updateQualityForAgedBrie(item:Item):Item{
    let newItem = new Item(item.name, item.sellIn, item.quality)
    if (!hasReachedMaxQuality(item)) {
        if (hasReachedSellTime(item)) newItem.quality = item.quality + 2
        else newItem.quality = item.quality + 1
    }
    newItem.sellIn = item.sellIn - 1;
    return newItem
}

function updateQualityForSulfuras(item:Item):Item{
    return new Item(item.name,item.sellIn,item.quality)
}

function updateQualityForBackstage(item:Item):Item{
    let newItem = new Item(item.name,item.sellIn,item.quality)
    if (!hasReachedMaxQuality(item)) {
        if (sellInDateIsImminent(item)) {
            newItem.quality = item.quality + 3
        }else if (sellInDateIsNear(item)) {
            newItem.quality = item.quality + 2
        }else{
            newItem.quality = item.quality + 1
        }
    }
    if (item.sellIn <= 0) {
        newItem.quality = item.quality - item.quality
    }
    newItem.sellIn = item.sellIn - 1;

    return newItem
}

function hasReachedSellTime(item:Item):Boolean{
    return item.sellIn <= 0
}

function hasReachedMinimumQuality(item:Item):Boolean{
    return item.quality === 0
}

function hasReachedMaxQuality(item:Item):Boolean{
    const MAX_QUALITY = 50;
    return (item.quality >= MAX_QUALITY)
}

function sellInDateIsImminent(item:Item):Boolean{
    return (item.sellIn < 6)
}

function sellInDateIsNear(item:Item):Boolean{
    return (item.sellIn < 11)
}