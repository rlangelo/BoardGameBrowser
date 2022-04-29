export class Delay {

    public wait(seconds: number): void {
        var start = Date.now(),
            now = start;
        while (now - start < (seconds/1000)) {
          now = Date.now();
        }
    }
}