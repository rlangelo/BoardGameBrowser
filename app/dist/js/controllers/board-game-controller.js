import { BoardGames } from "../models/board-games.js";
import { BoardGameService } from "../services/board-game-service.js";
import { BoardGameView } from "../views/board-game-view.js";
export class BoardGameController {
    constructor() {
        this.boardgameservice = new BoardGameService();
        this.boardgames = new BoardGames();
        this.boardGameView = new BoardGameView('#boardGameView');
        this.boardGameView.update(this.boardgames);
    }
    importData() {
        this.boardgameservice
            .obtainBoardGames().then(myboardgame => {
            this.boardgames.add(myboardgame);
            this.boardGameView.update(this.boardgames);
        });
    }
}
//# sourceMappingURL=board-game-controller.js.map