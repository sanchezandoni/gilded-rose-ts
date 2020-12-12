import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  it("Al final de cada día, nuestro sistema decrementa ambos valores para cada artículo mediante el método updateQuality", function(){
    const gildedRose = new GildedRose([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(0);
  })

  it("Una vez que ha pasado la fecha recomendada de venta, la calidad se degrada al doble de velocidad", function(){
    const gildedRose = new GildedRose([new Item("foo", 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  })

  it("La calidad de un artículo nunca es negativa", function(){
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  })

  it("El \"Queso Brie envejecido\" (Aged brie) incrementa su calidad a medida que se pone viejo: Su calidad aumenta en 1 unidad cada día", function(){
    const gildedRose = new GildedRose([new Item("Aged Brie", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(2);
  })

  it("El \"Queso Brie envejecido\" (Aged brie) incrementa su calidad a medida que se pone viejo: luego de la fecha de venta su calidad aumenta 2 unidades por día", function(){
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3);
  })

  it("La calidad de un artículo nunca es mayor a 50", function(){
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 50), new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
    expect(items[1].quality).toEqual(50);
  })

  it("El artículo \"Sulfuras\" (Sulfuras), siendo un artículo legendario, no modifica su fecha de venta ni se degrada en calidad", function(){
    const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(1);
    expect(items[0].quality).toEqual(1);
  })

  it("Una \"Entrada al Backstage\", como el queso brie, incrementa su calidad a medida que la fecha de venta se aproxima: si faltan 10 días o menos para el concierto, la calidad se incrementa en 2 unidades", function(){})

  it("Una \"Entrada al Backstage\", como el queso brie, incrementa su calidad a medida que la fecha de venta se aproxima: si faltan 5 días o menos, la calidad se incrementa en 3 unidades", function(){})

  it("Una \"Entrada al Backstage\", como el queso brie, incrementa su calidad a medida que la fecha de venta se aproxima: luego de la fecha de venta la calidad cae a 0", function(){})

});
