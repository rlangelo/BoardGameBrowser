export class BoardGame {
    constructor(
        public readonly name: string, 
        public readonly imageurl: string, 
    ) {}

    public static create(namestring: string, imageurlstring: string): BoardGame {
        return new BoardGame(namestring, imageurlstring)
    }

}