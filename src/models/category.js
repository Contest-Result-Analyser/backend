class Category {
    constructor(id, contest_id, operator, assisted, band, power, station, mode, transmitter, overlay) {
        this.id = id;
        this.contest_id = contest_id;
        this.operator = operator;
        this.assisted = assisted;
        this.band = band;
        this.power = power;
        this.station = station;
        this.mode = mode;
        this.transmitter = transmitter;
        this.overlay = overlay;
    }
}

module.exports = Category;