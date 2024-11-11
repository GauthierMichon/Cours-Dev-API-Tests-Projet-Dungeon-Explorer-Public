import { Player } from "./Player";
import { DungeonExplorer } from "./DungeonExplorer";

const player = new Player();
const game = new DungeonExplorer(player);
game.start();
