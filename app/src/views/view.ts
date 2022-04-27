export abstract class View<T> {

    protected element: HTMLElement;

    constructor(selector: string) {
        const elemento = document.querySelector(selector);
        if (elemento) {
            this.element = elemento as HTMLElement;
        } else {
            throw Error(`Selector ${selector} does not exist in the DOM.`);
        }
    }

    public update(model: T): void {
        let template = this.template(model);
        this.element.innerHTML = template;
    }

    protected abstract template(model: T): string;
}