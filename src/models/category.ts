export class Category {
    id: number;
    contest_id: number;
    operator: string;
    assisted: string;
    band: string;
    power: string;
    station: string;
    mode: string;
    transmitter: number;
    overlay: string;

    constructor(id: number, contest_id: number, operator: string, assisted: string, band: string, power: string, station: string, mode: string, transmitter: number, overlay: string) {
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