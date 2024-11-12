import { Weapon, Armor } from "./Item";

export class Player {
  health: number;
  maxHealth: number;
  potions: number;
  gold: number;
  experience: number;
  level: number;
  attackPower: number;
  defense: number;
  weapon: Weapon | null = null;
  armor: Armor | null = null;

  constructor(health: number = 100, potions: number = 0, gold: number = 0) {
    this.maxHealth = health;
    this.health = health;
    this.potions = potions;
    this.gold = gold;
    this.experience = 0;
    this.level = 1;
    this.attackPower = 10;
    this.defense = 5;
  }

  usePotion(): void {
    if (this.potions > 0) {
      this.health = Math.min(this.health + 20, this.maxHealth);
      this.potions--;
      console.log("Vous utilisez une potion et récupérez 20 points de vie.");
    } else {
      console.log("Vous n'avez pas de potion à utiliser.");
    }
  }

  gainExperience(amount: number): void {
    this.experience += amount;
    while (this.experience >= this.level * 20) {
      this.levelUp();
    }
  }

  levelUp(): void {
    this.level++;
    this.maxHealth += 20;
    this.attackPower += 5;
    this.defense += 2;
    console.log(
      `Niveau supérieur ! Vous êtes maintenant niveau ${this.level}.`
    );
  }

  equipWeapon(weapon: Weapon): void {
    this.weapon = weapon;
    this.attackPower += weapon.effect;
    console.log(
      `Vous vous équipez de ${weapon.name}. Attaque : ${this.attackPower}`
    );
  }

  equipArmor(armor: Armor): void {
    this.armor = armor;
    this.defense += armor.effect;
    console.log(
      `Vous vous équipez de ${armor.name}. Défense : ${this.defense}`
    );
  }
}
