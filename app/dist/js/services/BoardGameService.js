import { BoardGame } from "../models/board-game.js";
export class BoardGameService {
    obtainBoardGame() {
        return fetch('https://boardgamegeek.com/xmlapi/boardgame/123540')
            .then(res => res.json())
            .then((data) => {
            return data.map(myboardgame => {
                return new BoardGame(myboardgame.name, myboardgame.image);
            });
        });
    }
}
//# sourceMappingURL=BoardGameService.js.map