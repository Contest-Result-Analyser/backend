class Log {
    header: { version: string; category: string; grid: { locator: string}, claimed: { score: string }, address: string[], soapbox:string[], contest: string, callsign: string, location: string, created: {by: string}, name: string, operators: string[]} ;
    qsos: any[];

    constructor() {
        // TODO: Contest should be reference to contest.id
        this.header = {
            version: '',
            category: '',
            grid: {
                locator: ''
            },
            claimed: {
                score: ''
            },
            address: [],
            soapbox: [],
            contest: '',
            callsign: '',
            location: '',
            created: {
                by: ''
            },
            name: '',
            operators: []
        };
        this.qsos = [];
    }
}
export default Log;