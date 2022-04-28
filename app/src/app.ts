import { BoardGameController } from './controllers/board-game-controller.js';

const boardgamecontroller = new BoardGameController();
const searchbar = document.querySelector('.form');
if (searchbar) {
    searchbar.addEventListener('submit', event => {
        event.preventDefault();
        //controller.adiciona();
        boardgamecontroller.searchGame()
    });
} else {
    throw Error('Search Bar was not found. Verify that the search bar exists.');
}


/*const importButton = document.querySelector('#import-btn');
if (importButton) {
    importButton.addEventListener('click', () => {
        boardgamecontroller.importData();
    });
} else {
    throw Error('Import button was not found');
}test*/


