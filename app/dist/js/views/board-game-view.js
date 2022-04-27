import { View } from './view.js';
export class BoardGameView extends View {
    template(model) {
        return `
            ${model.list().map(boardgame => {
            return `
                <div class="card" style="width: 18rem;">
                    <img src="${boardgame.imageurl}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h3 class="card-title">${boardgame.name}</h3>
                    </div>
                </div>

                <br>
                <br>
                <br>
                `;
        }).join('')}`;
    }
}
//# sourceMappingURL=board-game-view.js.map