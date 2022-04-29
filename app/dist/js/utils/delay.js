export class Delay {
    wait(seconds) {
        var start = Date.now(), now = start;
        while (now - start < (seconds / 1000)) {
            now = Date.now();
        }
    }
}
//# sourceMappingURL=delay.js.map