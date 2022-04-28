import { BoardGameInterface } from "../interfaces/board-game-interface.js";
import { BoardGame } from "../models/board-game.js";

export class BoardGameService {

    /*public obtainBoardGames(): Promise<BoardGame> {
        return fetch('https://cors-anywhere.herokuapp.com/https://api.geekdo.com/xmlapi2/thing?id=123540')
        .then(res=>res.text()).then((data: string) => {
                const parser = new DOMParser();
                const xmlDOM = parser.parseFromString(data,"text/xml");
                const nameValue = xmlDOM.getElementsByTagName("name")[0].getAttribute("value");
                const bgName : string = nameValue !== null ? nameValue : '';
                console.log(bgName);
                const imgURL = xmlDOM.getElementsByTagName("image")[0].innerHTML;
                console.log(imgURL);
                return new BoardGame(bgName,imgURL);
           });
    }*/

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
            const imgURL = xmlDOM.getElementsByTagName("thumbnail");
            var bgNameValue = bgNames[0].getAttribute("value");
            var bgName : string = bgNameValue !== null ? bgNameValue : '';
            var imgValue = imgURL[0].getAttribute("value");
            var img : string = imgValue !== null ? imgValue : '';
            return new BoardGame(bgName,img);
        });
    }
    //TODO turn fetchBoardGame into fetchBoardGames and feed an array of ids. Do the iteration in that function which then returns a list of board games
    //then searchBoardGame will just return the list of the boardgames
    public searchBoardGame(searchQuery: string): Promise<BoardGame[]> {
        const searchParameters = searchQuery.split(" ");
        var apiCall = `https://api.geekdo.com/xmlapi2/search?query=`
        for (let i = 0; i < searchParameters.length; i++) {
            if (i > 0) {
                apiCall = apiCall.concat(`+`);
            }
            apiCall = apiCall.concat(searchParameters[i]);
        }
        apiCall = apiCall.concat(`&type=boardgame,boardgameexpansion`)
        console.log(apiCall);
        return fetch(apiCall).then(res=>res.text()).then((data: string) => {
            var boardgames: BoardGame[] = [];
            const parser = new DOMParser();
            const xmlDOM = parser.parseFromString(data,"text/xml");
            const items = xmlDOM.getElementsByTagName("item");
            for (let i = 0; i < items.length; i++) {
                var idValue = items[i].getAttribute("id");
                var id : string = idValue !== null ? idValue : '';
                this.fetchBoardGame(id).then(boardgame => {
                    boardgames.push(boardgame);
                });
            }
            return boardgames;
        });
    }
}