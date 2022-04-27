import { BoardGames } from "../models/board-games.js";
import { BoardGameService } from "../services/board-game-service.js";
import { BoardGameView } from "../views/board-game-view.js";
export class BoardGameController {
    constructor() {
        this.boardgameservice = new BoardGameService();
        this.boardgames = new BoardGames();
        this.boardGameView = new BoardGameView('#boardGameView');
        this.importData();
    }
    importData() {
        console.log("importing data");
        this.boardgameservice
            .obtainBoardGames().then(boardgames => {
            for (let boardgame of boardgames) {
                this.boardgames.add(boardgame);
            }
            this.boardGameView.update(this.boardgames);
        });
    }
}
//# sourceMappingURL=board-game-controller.js.map