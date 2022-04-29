var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BoardGame } from "../models/board-game.js";
import { Delay } from "../utils/delay.js";
export class BoardGameService {
    constructor() {
        this.delay = new Delay();
    }
    obtainBoardGames() {
        return fetch('https://api.geekdo.com/xmlapi2/hot?boardgame')
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
    fetchBoardGame(id) {
        var apiCall = "https://api.geekdo.com/xmlapi2/thing?id=";
        apiCall = apiCall.concat(id);
        return fetch(apiCall).then(res => res.text()).then((data) => {
            const parser = new DOMParser();
            const xmlDOM = parser.parseFromString(data, "text/xml");
            const bgNames = xmlDOM.getElementsByTagName("name");
            const imgURL = xmlDOM.getElementsByTagName("image");
            var bgNameValue = bgNames[0].getAttribute("value");
            var bgName = bgNameValue !== null ? bgNameValue : '';
            var imgValue = "";
            if (imgURL[0]) {
                imgValue = imgURL[0].innerHTML;
            }
            return new BoardGame(bgName, imgValue);
        });
    }
    fetchBoardGames(items) {
        return __awaiter(this, void 0, void 0, function* () {
            var boardgames = [];
            console.log(items.length);
            for (let i = 0; i < items.length; i++) {
                var idValue = items[i].getAttribute("id");
                var id = idValue !== null ? idValue : '';
                var boardgame = yield this.fetchBoardGame(id);
                boardgames.push(boardgame);
                this.delay.wait(1);
            }
            return boardgames;
        });
    }
    searchBoardGame(searchQuery) {
        const searchParameters = searchQuery.split(" ");
        var apiCall = `https://api.geekdo.com/xmlapi2/search?query=`;
        for (let i = 0; i < searchParameters.length; i++) {
            if (i > 0) {
                apiCall = apiCall.concat(`+`);
            }
            apiCall = apiCall.concat(searchParameters[i]);
        }
        apiCall = apiCall.concat(`&type=boardgame`);
        return fetch(apiCall).then(res => res.text()).then((data) => {
            var boardgames = [];
            const parser = new DOMParser();
            const xmlDOM = parser.parseFromString(data, "text/xml");
            const items = xmlDOM.getElementsByTagName("item");
            return this.fetchBoardGames(items);
        });
    }
}
//# sourceMappingURL=board-game-service.js.map