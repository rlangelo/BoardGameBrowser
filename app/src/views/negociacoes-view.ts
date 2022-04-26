import { escapar } from '../decorators/escapar.js';
import { Negociacoes } from '../models/negociacoes.js';
import { View } from './view.js';

export class NegociacoesView extends View<Negociacoes> {

    @escapar
    protected template(model: Negociacoes): string {
        return `
        `;
    }

    private formatar(data: Date): string {
        return new Intl.DateTimeFormat()
            .format(data);
    }
}