export function domInjector(selector) {
    return function (target, propertyKey) {
        console.log(`Changing prototype ${target.constructor.name}
             and adding getter to property ${propertyKey}`);
        let element;
        const getter = function () {
            if (!element) {
                element = document.querySelector(selector);
                console.log(`searching element from the DOM with selector ${selector} to inject in ${propertyKey}`);
            }
            return element;
        };
        Object.defineProperty(target, propertyKey, { get: getter });
    };
}
//# sourceMappingURL=dom-injector.js.map