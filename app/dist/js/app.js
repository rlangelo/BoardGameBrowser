import { BoardGameController } from './controllers/board-game-controller.js';
const boardgamecontroller = new BoardGameController();
const botaoImporta = document.querySelector('#import-btn');
if (botaoImporta) {
    botaoImporta.addEventListener('click', () => {
        boardgamecontroller.importData();
    });
}
else {
    throw Error('Botão importa não foi encontrado');
}
//# sourceMappingURL=app.js.map