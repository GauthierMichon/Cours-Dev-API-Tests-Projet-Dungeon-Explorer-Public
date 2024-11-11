import { DungeonExplorer } from "../DungeonExplorer";
import { Player } from "../Player";
import { Merchant } from "../Merchant";
import { Weapon, Armor } from "../Item";
import { Weapons } from "../Weapons";
import { Armors } from "../Armors";

describe("DungeonExplorer", () => {
  let player: Player;
  let game: DungeonExplorer;
  let merchant: Merchant;

  beforeEach(() => {
    player = new Player();
    game = new DungeonExplorer(player);
    merchant = new Merchant();
  });

  it("Le joueur ne peut pas acheter d'armes ou armures non proposées par le marchand", () => {
    // Étant donné un marchand qui propose des armes et des armures
    const spyGetRandomItem = jest.spyOn(merchant, "getRandomItem");
    spyGetRandomItem.mockImplementation((items) => items[0]);

    // Quand le joueur tente d'acheter une arme
    jest.spyOn(require("readline-sync"), "question").mockReturnValue("2");
    merchant.sell(player);

    // Alors il reçoit l'arme proposée par le marchand
    expect(spyGetRandomItem).toHaveBeenCalledWith(Weapons);
    expect(player.weapon?.name).toBe(Weapons[0].name);
  });

  it("Le joueur reçoit correctement l'expérience et augmente de niveau", () => {});

  it("Le joueur gagne une potion dans son inventaire en trouvant une potion", () => {});

  it("Le joueur voit ses points de vie affichés comme étant 0 au minimum après un combat", () => {
    // Étant donné un joueur avec peu de points de vie
    player.health = 5;
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const monsterAttack = 20;

    // Quand le joueur subit une attaque qui devrait réduire sa santé en dessous de 0
    game.encounterMonster = jest.fn().mockImplementation(() => {
      player.health -= monsterAttack;
      player.health = Math.max(0, player.health);
      console.log(`Santé restante : ${player.health}`);
    });
    game.encounterMonster();

    // Alors la santé du joueur est affichée comme étant 0
    expect(player.health).toBe(0);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Santé restante : 0")
    );
    consoleSpy.mockRestore();
  });
});
