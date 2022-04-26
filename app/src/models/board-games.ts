import { BoardGame } from "./board-game.js";

export class BoardGames {
    private boardgames: BoardGame[] = [];

    public add(boardgame: BoardGame) {
        this.boardgames.push(boardgame);
    }

    public list(): readonly BoardGame[] {
        return this.boardgames;
    }



}