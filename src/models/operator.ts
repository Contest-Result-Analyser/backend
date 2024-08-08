class Operator {
    id?: number | null;
    callsign: string;
    license: string;
    owner: string;
    residence: string;

    constructor(operator?: Partial<Operator>) {
        this.callsign = operator?.callsign ?? "";
        this.license = operator?.license ?? "";
        this.owner = operator?.owner ?? "";
        this.residence = operator?.residence ?? "";
    }
}

export default Operator;