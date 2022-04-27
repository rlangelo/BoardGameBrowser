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
        return fetch('https://cors-anywhere.herokuapp.com/https://api.geekdo.com/xmlapi2/hot?boardgame')
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
}