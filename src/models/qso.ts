export default class Qso {
    freq: string;
    mode: string;
    date: string;
    time: string;
    tx: any; // Replace 'any' with the appropriate type
    rx: any; // Replace 'any' with the appropriate type

    constructor(freq: string, mode: string, date: string, time: string, tx: any, rx: any) {
        this.freq = freq;
        this.mode = mode;
        this.date = date;
        this.time = time;
        this.tx = tx;
        this.rx = rx;
    }
}