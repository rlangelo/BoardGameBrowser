import { BoardGames } from "../models/board-games.js";
import { BoardGameService } from "../services/board-game-service.js";
import { BoardGameView } from "../views/board-game-view.js";
import { domInjector } from "../decorators/dom-injector.js";

export class BoardGameController {
    private boardgameservice = new BoardGameService();
    private boardgames = new BoardGames();
    private boardGameView = new BoardGameView('#boardGameView');
    @domInjector('#searchBar')
    private searchData: HTMLInputElement;

    constructor() {
        //this.importData();
    }

    public importData(): void {
        console.log("importing data");
        this.boardgameservice
            .obtainBoardGames().then(boardgames => {
                for (let boardgame of boardgames) {
                    this.boardgames.add(boardgame);
                }
                this.boardGameView.update(this.boardgames);
            });
    }

    public searchGame(): void {
        if (this.searchData.value != "") {
            this.boardgameservice.searchBoardGame(this.searchData.value).then(boardgames => {
                console.log(boardgames);
                for (let boardgame of boardgames) {
                    this.boardgames.add(boardgame);
                }
                this.boardGameView.update(this.boardgames);
            });
        }
        else {
            console.log("Search string is empty");
        }
    }
}