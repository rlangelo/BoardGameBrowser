import { BoardGame } from "../models/board-game.js";
export class BoardGameService {
    obtainBoardGames() {
        return fetch('https://cors-anywhere.herokuapp.com/https://api.geekdo.com/xmlapi2/thing?id=123540', {
            headers: {
                'Content-Type': 'application/xml',
                'Accept': 'application/xml'
            }
        }).then(res => res.text()).then((data) => {
            const parser = new DOMParser();
            const xmlDOM = parser.parseFromString(data, "text/xml");
            const nameValue = xmlDOM.getElementsByTagName("name")[0].getAttribute("value");
            const bgName = nameValue !== null ? nameValue : '';
            console.log(bgName);
            const imgURL = xmlDOM.getElementsByTagName("image")[0].innerHTML;
            console.log(imgURL);
            return new BoardGame(bgName, imgURL);
        });
    }
}
//# sourceMappingURL=board-game-service.js.map