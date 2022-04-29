var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BoardGames } from "../models/board-games.js";
import { BoardGameService } from "../services/board-game-service.js";
import { BoardGameView } from "../views/board-game-view.js";
import { domInjector } from "../decorators/dom-injector.js";
export class BoardGameController {
    constructor() {
        this.boardgameservice = new BoardGameService();
        this.boardgames = new BoardGames();
        this.boardGameView = new BoardGameView('#boardGameView');
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
    searchGame() {
        if (this.searchData.value != "") {
            this.boardgames.emptyList();
            this.boardgameservice.searchBoardGame(this.searchData.value).then(boardgames => {
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
__decorate([
    domInjector('#searchBar')
], BoardGameController.prototype, "searchData", void 0);
//# sourceMappingURL=board-game-controller.js.map