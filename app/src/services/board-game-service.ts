import { BoardGameInterface } from "../interfaces/board-game-interface.js";
import { BoardGame } from "../models/board-game.js";

export class BoardGameService {

    public obtainBoardGames(): Promise<BoardGame> {
        return fetch('https://cors-anywhere.herokuapp.com/https://boardgamegeek.com/xmlapi/boardgame/123540', {
        headers : { 
            'Content-Type': 'application/xml',
            'Accept': 'application/xml'
           }}).then(res=>res.text()).then((data: string) => {
                const parser = new DOMParser();
                const xmlDOM = parser.parseFromString(data,"text/xml");
                const bgName = xmlDOM.getElementsByTagName("name")[0].innerHTML;
                const imgURL = xmlDOM.getElementsByTagName("image")[0].innerHTML;
                return new BoardGame(bgName,imgURL);
           });
    }
}


/*fetch('Your_API_URL')
.then(response=>response.text())
.then(data=>{
    const parser = new DOMParser();
    const xmlDOM = parser.parseFromString(data,"text/xml");
    const value = xmlDOM.getElementsByTagName("string")[0].childNodes[0].nodeValue;
    console.log(value)
})
.catch(err=>console.log(err))*/


/*.then(res => res.text()).then(data: BoardGameInterface[] => {
            return data.map(myboardgame => {
                return new BoardGame( 
                    myboardgame.name, 
                    myboardgame.image
                )
            })
        });*/