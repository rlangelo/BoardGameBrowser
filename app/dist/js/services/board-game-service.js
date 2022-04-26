import { BoardGame } from "../models/board-game.js";
export class BoardGameService {
    obtainBoardGames() {
        return fetch('https://cors-anywhere.herokuapp.com/https://boardgamegeek.com/xmlapi/boardgame/123540', {
            headers: {
                'Content-Type': 'application/xml',
                'Accept': 'application/xml'
            }
        }).then(res => res.text()).then((data) => {
            const parser = new DOMParser();
            const xmlDOM = parser.parseFromString(data, "text/xml");
            const bgName = xmlDOM.getElementsByTagName("name")[0].innerHTML;
            const imgURL = xmlDOM.getElementsByTagName("image")[0].innerHTML;
            return new BoardGame(bgName, imgURL);
        });
    }
}
//# sourceMappingURL=board-game-service.js.map