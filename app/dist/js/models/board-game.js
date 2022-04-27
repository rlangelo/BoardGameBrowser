export class BoardGame {
    constructor(name, imageurl) {
        this.name = name;
        this.imageurl = imageurl;
    }
    static create(namestring, imageurlstring) {
        return new BoardGame(namestring, imageurlstring);
    }
}
//# sourceMappingURL=board-game.js.map