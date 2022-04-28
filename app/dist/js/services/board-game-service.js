import { BoardGame } from "../models/board-game.js";
export class BoardGameService {
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
            const imgURL = xmlDOM.getElementsByTagName("thumbnail");
            var bgNameValue = bgNames[0].getAttribute("value");
            var bgName = bgNameValue !== null ? bgNameValue : '';
            var imgValue = imgURL[0].getAttribute("value");
            var img = imgValue !== null ? imgValue : '';
            return new BoardGame(bgName, img);
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
        apiCall = apiCall.concat(`&type=boardgame,boardgameexpansion`);
        console.log(apiCall);
        return fetch(apiCall).then(res => res.text()).then((data) => {
            var boardgames = [];
            const parser = new DOMParser();
            const xmlDOM = parser.parseFromString(data, "text/xml");
            const items = xmlDOM.getElementsByTagName("item");
            for (let i = 0; i < items.length; i++) {
                var idValue = items[i].getAttribute("id");
                var id = idValue !== null ? idValue : '';
                this.fetchBoardGame(id).then(boardgame => {
                    boardgames.push(boardgame);
                });
            }
            return boardgames;
        });
    }
}
//# sourceMappingURL=board-game-service.js.map