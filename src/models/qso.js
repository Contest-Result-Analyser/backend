class Qso {
    constructor(freq, mode, date, time, tx, rx) {
        this.freq = freq;
        this.mode = mode;
        this.date = date;
        this.time = time;
        this.tx = tx;
        this.rx = rx;
    }
}

module.exports = Qso;
