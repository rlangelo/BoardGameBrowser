import { BoardGameController } from './controllers/board-game-controller.js';
import { NegociacaoController } from './controllers/negociacao-controller.js';
const controller = new NegociacaoController();
const form = document.querySelector('.form');
const boardgamecontroller = new BoardGameController();
const botaoImporta = document.querySelector('#botao-importa');
if (botaoImporta) {
    botaoImporta.addEventListener('click', () => {
        boardgamecontroller.importData();
    });
}
else {
    throw Error('Botão importa não foi encontrado');
}
//# sourceMappingURL=app.js.map