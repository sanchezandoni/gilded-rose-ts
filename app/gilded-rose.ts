const MAX_QUALITY = 50;
const QUALITY_CHANGE_RATE_BEFORE_SELLIN = 1;
const QUALITY_CHANGE_RATE_AFTER_SELLIN = QUALITY_CHANGE_RATE_BEFORE_SELLIN * 2;
const QUALITY_CHANGE_RATE_FOR_IMMINENT_SELLIN = 3;
const QUALITY_CHANGE_RATE_FOR_NEAR_SELLIN = 2;
const QUALITY_CHANGE_RATE_FOR_NORMAL_SELLIN = 1;
const SELLIN_DECREASE_RATE = 1;
const DAYS_FOR_CONSIDERING_IMMINENT_SELLIN = 5;
const DAYS_FOR_CONSIDERING_NEAR_SELLIN = 10;

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
        this.items = this.items.map(updateQualityByProductType);
        return this.items;
    }
}

function updateQualityByProductType(currentItem:Item):Item {
    var updatedItem:Item;
    switch(currentItem.name){
        case 'Aged Brie':
            updatedItem = updateQualityForAgedBrie(currentItem);
            break;
        case 'Backstage passes to a TAFKAL80ETC concert':
            updatedItem = updateQualityForBackstage(currentItem);
            break;
        case 'Sulfuras, Hand of Ragnaros':
            updatedItem = updateQualityForSulfuras(currentItem);
            break;
        case 'Conjurado':
            updatedItem = updateQualityForConjurados(currentItem);
            break;
        default:
            updatedItem = updateQualityForOtherItems(currentItem);
            break;
    }
    return updatedItem
}

function updateQualityForConjurados(item:Item):Item{
    let newItem = new Item(item.name, item.sellIn, item.quality);
    if (!hasReachedMinimumQuality(item)) {
        if(hasReachedSellTime(item)){
            newItem.quality = item.quality - (QUALITY_CHANGE_RATE_AFTER_SELLIN * 2);
        }else{
            newItem.quality = item.quality - (QUALITY_CHANGE_RATE_BEFORE_SELLIN * 2);
        }
    }
    
    newItem.sellIn = item.sellIn - SELLIN_DECREASE_RATE;

    return newItem;
}

function updateQualityForOtherItems(item:Item): Item{
    let newItem = new Item(item.name, item.sellIn, item.quality);
    if (!hasReachedMinimumQuality(item)) {
        if(hasReachedSellTime(item)){
            newItem.quality = item.quality - QUALITY_CHANGE_RATE_AFTER_SELLIN;
        }else{
            newItem.quality = item.quality - QUALITY_CHANGE_RATE_BEFORE_SELLIN;
        }
    }
    
    newItem.sellIn = item.sellIn - SELLIN_DECREASE_RATE;

    return newItem;
}

function updateQualityForAgedBrie(item:Item):Item{
    let newItem = new Item(item.name, item.sellIn, item.quality);
    if (!hasReachedMaxQuality(item)) {
        if (hasReachedSellTime(item)) newItem.quality = item.quality + QUALITY_CHANGE_RATE_AFTER_SELLIN;
        else newItem.quality = item.quality + QUALITY_CHANGE_RATE_BEFORE_SELLIN;
    }
    newItem.sellIn = item.sellIn - SELLIN_DECREASE_RATE;
    return newItem;
}

function updateQualityForSulfuras(item:Item):Item{
    return new Item(item.name,item.sellIn,item.quality);
}

function updateQualityForBackstage(item:Item):Item{
    let newItem = new Item(item.name,item.sellIn,item.quality);
    if (!hasReachedMaxQuality(item)) {
        if (sellInDateIsImminent(item)) {
            newItem.quality = item.quality + QUALITY_CHANGE_RATE_FOR_IMMINENT_SELLIN;
        }else if (sellInDateIsNear(item)) {
            newItem.quality = item.quality + QUALITY_CHANGE_RATE_FOR_NEAR_SELLIN;
        }else{
            newItem.quality = item.quality + QUALITY_CHANGE_RATE_FOR_NORMAL_SELLIN;
        }
    }
    if (hasReachedSellTime(item)) {
        newItem.quality = 0;
    }
    newItem.sellIn = item.sellIn - SELLIN_DECREASE_RATE;

    return newItem;
}

function hasReachedSellTime(item:Item):Boolean{
    return item.sellIn <= 0;
}

function hasReachedMinimumQuality(item:Item):Boolean{
    return item.quality === 0;
}

function hasReachedMaxQuality(item:Item):Boolean{
    return (item.quality >= MAX_QUALITY);
}

function sellInDateIsImminent(item:Item):Boolean{
    return (item.sellIn <= DAYS_FOR_CONSIDERING_IMMINENT_SELLIN);
}

function sellInDateIsNear(item:Item):Boolean{
    return (item.sellIn <= DAYS_FOR_CONSIDERING_NEAR_SELLIN);
}