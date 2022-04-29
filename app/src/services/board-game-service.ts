import { BoardGame } from "../models/board-game.js";
import { Delay } from "../utils/delay.js";

export class BoardGameService {
    private delay = new Delay();

    public obtainBoardGames(): Promise<BoardGame[]> {
        return fetch('https://api.geekdo.com/xmlapi2/hot?boardgame')
        .then(res=>res.text()).then((data: string) => {
            const parser = new DOMParser();
            const xmlDOM = parser.parseFromString(data,"text/xml");
            const bgNames = xmlDOM.getElementsByTagName("name");
            const imgURL = xmlDOM.getElementsByTagName("thumbnail");
            var boardgames = [];
            for (let i = 0; i < bgNames.length; i++) {
                var bgNameValue =  bgNames[i].getAttribute("value");
                var bgName : string = bgNameValue !== null ? bgNameValue : '';
                var imgValue = imgURL[i].getAttribute("value");
                var img : string = imgValue !== null ? imgValue : '';
                var boardgame = new BoardGame(bgName,img);
                boardgames.push(boardgame);
            }
            return boardgames;
        });
    }

    public fetchBoardGame(id: string): Promise<BoardGame> {
        var apiCall = "https://api.geekdo.com/xmlapi2/thing?id=";
        apiCall = apiCall.concat(id);
        return fetch(apiCall).then(res=>res.text()).then((data: string) => {
            const parser = new DOMParser();
            const xmlDOM = parser.parseFromString(data,"text/xml");
            const bgNames = xmlDOM.getElementsByTagName("name");
            const imgURL = xmlDOM.getElementsByTagName("image");
            var bgNameValue = bgNames[0].getAttribute("value");
            var bgName : string = bgNameValue !== null ? bgNameValue : '';
            var imgValue = "";
            if (imgURL[0]) {
                imgValue = imgURL[0].innerHTML;
            }
            return new BoardGame(bgName,imgValue);
        });
    }

    public async fetchBoardGames(items: HTMLCollectionOf<Element>): Promise<BoardGame[]> {
        var boardgames: BoardGame[] = [];
        console.log(items.length);
        for (let i = 0; i < items.length; i++) {
            var idValue = items[i].getAttribute("id");
            var id : string = idValue !== null ? idValue : '';
            var boardgame: BoardGame = await this.fetchBoardGame(id);
            boardgames.push(boardgame);
            this.delay.wait(1);
        }
        return boardgames;
    }

    public searchBoardGame(searchQuery: string): Promise<BoardGame[]> {
        const searchParameters = searchQuery.split(" ");
        var apiCall = `https://api.geekdo.com/xmlapi2/search?query=`
        for (let i = 0; i < searchParameters.length; i++) {
            if (i > 0) {
                apiCall = apiCall.concat(`+`);
            }
            apiCall = apiCall.concat(searchParameters[i]);
        }
        apiCall = apiCall.concat(`&type=boardgame`)
        return fetch(apiCall).then(res=>res.text()).then((data: string) => {
        var boardgames: BoardGame[] = [];
        const parser = new DOMParser();
        const xmlDOM = parser.parseFromString(data,"text/xml");
        const items = xmlDOM.getElementsByTagName("item");
        return this.fetchBoardGames(items);
        });
    }
}

