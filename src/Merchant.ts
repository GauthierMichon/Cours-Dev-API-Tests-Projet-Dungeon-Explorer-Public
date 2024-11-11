import * as readlineSync from "readline-sync";
import { Weapon } from "./Item";
import { Armor } from "./Item";
import { Weapons } from "./Weapons";
import { Armors } from "./Armors";
import { Player } from "./Player";

export class Merchant {
  getRandomItem<T extends { dropRate: number }>(items: T[]): T {
    const totalRate = items.reduce((acc, item) => acc + item.dropRate, 0);
    let random = Math.random() * totalRate;
    for (const item of items) {
      if (random < item.dropRate) return item;
      random -= item.dropRate;
    }
    return items[0];
  }

  sell(player: Player): void {
    const weapon = this.getRandomItem(Weapons);
    const armor = this.getRandomItem(Armors);

    console.log(`Vous avez ${player.gold} pièces d'or.`);
    console.log(`Le marchand propose :`);
    console.log(`1. Potion (20 or)`);
    console.log(`2. ${weapon.name} (${weapon.price} or)`);
    console.log(`3. ${armor.name} (${armor.price} or)`);
    console.log(`4. Ne rien acheter`);

    const choice = readlineSync.question(
      "Que voulez-vous acheter (Ecrivez le nombre) ? (1: Potion, 2: Arme, 3: Armure, 4: Rien) : "
    );

    switch (choice) {
      case "1":
        player.gold -= 20;
        player.potions++;
        console.log("Vous avez acheté une potion.");
        break;
      case "2":
        player.gold -= weapon.price;
        player.equipWeapon(weapon);
        break;
      case "3":
        player.gold -= armor.price;
        player.equipArmor(armor);
        break;
      case "4":
        console.log("Vous décidez de ne rien acheter.");
        break;
      default:
        console.log("Option invalide. Le marchand est impatient !");
        break;
    }
  }
}
