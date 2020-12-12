import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  it("Al final de cada día, nuestro sistema decrementa ambos valores para cada artículo mediante el método updateQuality", function(){
    const gildedRose = new GildedRose([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
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

  it("La calidad de un artículo nunca es mayor a 50, excepto los items sulfuras que son de 80", function(){
    const gildedRose = new GildedRose([
      new Item("Aged Brie", 0, 50), 
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50),
      new Item("Sulfuras, Hand of Ragnaros", 1, 80)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
    expect(items[1].quality).toEqual(50);
    expect(items[2].quality).toEqual(80);
  })

  it("El artículo \"Sulfuras\" (Sulfuras), siendo un artículo legendario, no modifica su fecha de venta ni se degrada en calidad", function(){
    const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(1);
    expect(items[0].quality).toEqual(1);
  })

  it("Una \"Entrada al Backstage\", como el queso brie, incrementa su calidad a medida que la fecha de venta se aproxima", function(){
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(2);
  })

  it("Una \"Entrada al Backstage\", como el queso brie, incrementa su calidad a medida que la fecha de venta se aproxima: si faltan 10 días o menos para el concierto, la calidad se incrementa en 2 unidades", function(){
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3);
  })

  it("Una \"Entrada al Backstage\", como el queso brie, incrementa su calidad a medida que la fecha de venta se aproxima: si faltan 5 días o menos, la calidad se incrementa en 3 unidades", function(){
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(4);
  })

  it("Una \"Entrada al Backstage\", como el queso brie, incrementa su calidad a medida que la fecha de venta se aproxima: luego de la fecha de venta la calidad cae a 0", function(){
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5),new Item("Backstage passes to a TAFKAL80ETC concert", -2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
    expect(items[1].quality).toEqual(0);
  })

  it("Un item conjurado degrada su calidad el doble que los normales", function(){
    const gildedRose =  new GildedRose([new Item("Conjurado", 1, 2),new Item("Conjurado", -1, 4)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).toEqual(0)
    expect(items[1].quality).toEqual(0)
  })

  it("Todos los elementos decrementan en uno su dia para la venta, excepto las Sulfuras",function(){
    const gildedRose = new GildedRose([
      new Item("Aged Brie", -1, 1), 
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1),
      new Item("Sulfuras, Hand of Ragnaros", 1, 1),
      new Item("foo", 3, 1)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(-2);
    expect(items[1].sellIn).toEqual(-1);
    expect(items[2].sellIn).toEqual(1);
    expect(items[3].sellIn).toEqual(2);
  })

});
