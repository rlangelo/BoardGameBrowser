export class BoardGames {
    constructor() {
        this.boardgames = [];
    }
    add(boardgame) {
        this.boardgames.push(boardgame);
    }
    list() {
        return this.boardgames;
    }
    emptyList() {
        this.boardgames = [];
    }
}
//# sourceMappingURL=board-games.js.map