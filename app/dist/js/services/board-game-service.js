import { BoardGame } from "../models/board-game.js";
export class BoardGameService {
    obtainBoardGames() {
        return fetch('https://cors-anywhere.herokuapp.com/https://api.geekdo.com/xmlapi2/hot?boardgame')
            .then(res => res.text()).then((data) => {
            const parser = new DOMParser();
            const xmlDOM = parser.parseFromString(data, "text/xml");
            const bgNames = xmlDOM.getElementsByTagName("name");
            const imgURL = xmlDOM.getElementsByTagName("thumbnail");
            var boardgames = [];
            for (let i = 0; i < bgNames.length; i++) {
                var bgNameValue = bgNames[i].getAttribute("value");
                var bgName = bgNameValue !== null ? bgNameValue : '';
                var imgValue = imgURL[i].getAttribute("value");
                var img = imgValue !== null ? imgValue : '';
                var boardgame = new BoardGame(bgName, img);
                boardgames.push(boardgame);
            }
            return boardgames;
        });
    }
}
//# sourceMappingURL=board-game-service.js.map