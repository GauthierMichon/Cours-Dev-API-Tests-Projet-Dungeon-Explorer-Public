export abstract class Item {
  constructor(public name: string, public effect: number) {}
}

export class Weapon extends Item {
  constructor(
    name: string,
    effect: number,
    public dropRate: number,
    public price: number
  ) {
    super(name, effect);
  }
}

export class Armor extends Item {
  constructor(
    name: string,
    effect: number,
    public dropRate: number,
    public price: number
  ) {
    super(name, effect);
  }
}
