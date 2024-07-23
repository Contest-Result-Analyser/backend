class Log {
    constructor() {
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

module.exports = Log;