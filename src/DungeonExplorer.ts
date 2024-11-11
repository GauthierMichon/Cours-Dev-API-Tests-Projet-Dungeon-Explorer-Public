import * as readlineSync from "readline-sync";
import { Player } from "./Player";
import { Merchant } from "./Merchant";
import { Weapons } from "./Weapons";
import { Armors } from "./Armors";

export class DungeonExplorer {
  player: Player;
  roomsExplored: number = 0;
  merchant: Merchant = new Merchant();

  constructor(player: Player) {
    this.player = player;
    console.log("Bienvenue dans le donjon !");
  }

  explore(): void {
    const event = this.getRandomEvent();
    console.log(`Vous explorez une nouvelle pièce et rencontrez : ${event}.`);
    this.roomsExplored++;

    switch (event) {
      case "monstre":
        this.encounterMonster();
        break;
      case "trésor":
        this.findTreasure();
        break;
      case "marchand":
        this.merchant.sell(this.player);
        break;
      case "potion":
        this.player.potions++;
        console.log("Vous trouvez une potion !");
        break;
      default:
        console.log("Cette pièce est vide.");
    }

    if (this.roomsExplored % 5 === 0) {
      console.log("Vous approchez d'un boss !");
      this.encounterBoss();
    }
  }

  getRandomEvent(): string {
    const events = [
      "monstre",
      "monstre",
      "monstre",
      "trésor",
      "marchand",
      "potion",
    ];
    return events[Math.floor(Math.random() * events.length)];
  }

  encounterMonster(): void {
    let monsterHealth = 20 + this.player.level * 10;
    const monsterAttack = 5 + this.player.level * 2;
    console.log(`Un monstre apparaît avec ${monsterHealth} points de vie !`);

    while (monsterHealth > 0 && this.player.health > 0) {
      const action = readlineSync.question(
        "Que voulez-vous faire ? (attaquer / fuir / utiliser potion) : "
      );
      switch (action) {
        case "attaquer":
          const damage =
            Math.floor(Math.random() * this.player.attackPower) + 5;
          monsterHealth -= damage;
          monsterHealth = Math.max(0, monsterHealth);
          console.log(
            `Vous attaquez et infligez ${damage} dégâts au monstre. Vie restante du monstre : ${monsterHealth}`
          );
          if (monsterHealth <= 0) {
            console.log("Vous avez vaincu le monstre !");
            this.player.gainExperience(10);
            this.monsterDrop();
            return;
          }
          break;
        case "fuir":
          console.log("Vous fuyez vers la pièce précédente.");
          return;
        case "utiliser potion":
          this.player.usePotion();
          break;
        default:
          console.log("Action invalide.");
          break;
      }

      const monsterDamage =
        Math.floor(monsterAttack - this.player.defense + Math.random() * 5) + 1;

      this.player.health -= monsterDamage;
      this.player.health = Math.max(0, this.player.health);
      console.log(
        `Le monstre vous attaque et vous inflige ${monsterDamage} dégâts. Santé restante : ${this.player.health}`
      );

      if (this.player.health <= 0) {
        console.log("Vous êtes mort ! Le donjon vous a vaincu.");
        process.exit();
      }
    }
  }

  encounterBoss(): void {
    let bossHealth = 50 + this.player.level * 15;
    const bossAttack = 10 + this.player.level * 3;
    console.log(
      `Un BOSS redoutable apparaît avec ${bossHealth} points de vie !`
    );

    while (bossHealth > 0 && this.player.health > 0) {
      const action = readlineSync.question(
        "Que voulez-vous faire ? (attaquer / utiliser potion) : "
      );
      switch (action) {
        case "attaquer":
          const damage =
            Math.floor(Math.random() * this.player.attackPower) + 10;
          bossHealth -= damage;
          bossHealth = Math.max(0, bossHealth);
          console.log(
            `Vous attaquez et infligez ${damage} dégâts au BOSS. Vie restante du BOSS : ${bossHealth}`
          );
          if (bossHealth <= 0) {
            console.log("Vous avez vaincu le BOSS !");
            this.player.gainExperience(50);
            this.monsterDrop();
            return;
          }
          break;
        case "utiliser potion":
          this.player.usePotion();
          break;
        default:
          console.log("Action invalide.");
          break;
      }

      const bossDamage =
        Math.floor(bossAttack - this.player.defense + Math.random() * 5) + 8;

      this.player.health -= bossDamage;
      this.player.health = Math.max(0, this.player.health);
      console.log(
        `Le BOSS vous attaque et vous inflige ${bossDamage} dégâts. Santé restante : ${this.player.health}`
      );

      if (this.player.health <= 0) {
        console.log("Vous êtes mort ! Le donjon vous a vaincu.");
        process.exit();
      }
    }
  }

  findTreasure(): void {
    const goldFound = Math.floor(Math.random() * 30) + 20;
    this.player.gold += goldFound * 2;
    console.log(`Vous trouvez un trésor contenant ${goldFound} pièces d'or !`);
  }

  monsterDrop(): void {
    const dropChance = Math.random();
    if (dropChance < 0.15) {
      const weapon = this.getRandomItem(Weapons);
      console.log(`Le monstre laisse tomber une arme : ${weapon.name} !`);
      this.player.equipWeapon(weapon);
    } else if (dropChance < 0.3) {
      const armor = this.getRandomItem(Armors);
      console.log(`Le monstre laisse tomber une armure : ${armor.name} !`);
      this.player.equipArmor(armor);
    } else {
      const goldFound = Math.floor(Math.random() * 20) + 10;
      this.player.gold += goldFound;
      console.log(`Le monstre laisse tomber ${goldFound} pièces d'or.`);
    }
  }

  getRandomItem<T extends { dropRate: number }>(items: T[]): T {
    const totalRate = items.reduce((acc, item) => acc + item.dropRate, 0);
    let random = Math.random() * totalRate;
    for (const item of items) {
      if (random < item.dropRate) return item;
      random -= item.dropRate;
    }
    return items[0];
  }

  start(): void {
    while (this.player.health > 0) {
      const direction = readlineSync.question(
        "Choisissez une direction pour explorer (nord, sud, est, ou ouest) : "
      );
      this.explore();
    }
    console.log("Merci d'avoir exploré le donjon !");
  }
}
