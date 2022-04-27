import { BoardGames } from "../models/board-games.js";
import { BoardGameService } from "../services/board-game-service.js";
import { BoardGameView } from "../views/board-game-view.js";

export class BoardGameController {
    private boardgameservice = new BoardGameService();
    private boardgames = new BoardGames();
    private boardGameView = new BoardGameView('#boardGameView');

    constructor() {
        this.importData();
    }

    public importData(): void {
        console.log("importing data");
        this.boardgameservice
            .obtainBoardGames().then(myboardgame => {
                this.boardgames.add(myboardgame);
                this.boardGameView.update(this.boardgames);
            });
    }
}