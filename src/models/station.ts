export class Station {
    call: string;
    rst: string;
    exch: string;
    ov: string;
    locator: string;

    constructor(call: string, rst: string, exch: string, ov: string, locator: string) {
        this.call = call;
        this.rst = rst;
        this.exch = exch;
        this.ov = ov;
        this.locator = locator;
    }
}