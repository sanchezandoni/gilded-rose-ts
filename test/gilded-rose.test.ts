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
});
