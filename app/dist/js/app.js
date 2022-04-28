import { BoardGameController } from './controllers/board-game-controller.js';
const boardgamecontroller = new BoardGameController();
const searchbar = document.querySelector('.form');
if (searchbar) {
    searchbar.addEventListener('submit', event => {
        event.preventDefault();
        boardgamecontroller.searchGame();
    });
}
else {
    throw Error('Search Bar was not found. Verify that the search bar exists.');
}
//# sourceMappingURL=app.js.map