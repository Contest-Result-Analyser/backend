const fs = require('fs');
const jschardet = require('jschardet');
const iconv = require('iconv-lite');
const Log = require('../models/log');
const Qso = require('../models/qso');
const Station = require('../models/station');
const CategoryController = require('../controllers/categoryController');
const ContestController = require('../controllers/contestController');

class CabrilloController {
    constructor() {
        this.filePath = './uploads/logs/'
    }

    async parseFile(req, res) {
        const filename = req.query.filename;

        if (!filename) {
            return res.status(400).json({error: 'search term parameter is required'});
        }

        let log = new Log();

        await this.readFileWithDetectedEncoding(this.filePath + filename)
            .then(async data => {
                let category = {};
                let contest = false;
                const lines = data.split('\n');

                for (let line of lines) {
                    line = line.trim();

                    if (line && !line.startsWith(';')) {
                        const [lineKey, ...valueParts] = line.split(':', 2);
                        const lineValue = valueParts.join(':').trim();

                        switch (lineKey) {
                            case "START-OF-LOG":
                                log.header.version = lineValue;
                                break;
                            case "CONTEST":
                                contest = lineValue;
                                break;
                            case "CALLSIGN":
                                log.header.callsign = lineValue;
                                break;
                            case "LOCATION":
                                log.header.location = lineValue;
                                break;
                            case "CATEGORY-OPERATOR":
                                category.operator = lineValue;
                                break;
                            case "CATEGORY-ASSISTED":
                                category.assisted = lineValue;
                                break;
                            case "CATEGORY-BAND":
                                category.band = lineValue;
                                break;
                            case "CATEGORY-POWER":
                                category.power = lineValue;
                                break;
                            case "CATEGORY-MODE":
                                category.mode = lineValue;
                                break;
                            case "CATEGORY-TRANSMITTER":
                                category.transmitter = lineValue;
                                break;
                            case "CATEGORY-OVERLAY":
                                category.overlay = lineValue;
                                break;
                            case "CATEGORY-STATION":
                                category.station = lineValue;
                                break;
                            case "GRID-LOCATOR":
                                log.header.grid.locator = lineValue;
                                break;
                            case "CLAIMED-SCORE":
                                log.header.claimed.score = lineValue;
                                break;
                            case "CLUB":
                                log.header.club = lineValue;
                                break;
                            case "CREATED-BY":
                                log.header.created.by = lineValue;
                                break;
                            case "NAME":
                                log.header.name = lineValue;
                                break;
                            case "ADDRESS":
                                log.header.address.push(lineValue);
                                break;
                            case "OPERATORS":
                                log.header.operators = lineValue.split(",").map(operator => {
                                    return operator.trim();
                                });
                                break;
                            case "SOAPBOX":
                                if (lineValue.length > 1) {
                                    log.soapbox.push(lineValue);
                                }
                                break;
                            case "END-OF-LOG":
                                break;
                            case "QSO":
                                let qsoData = this.parseQso(lineValue);
                                if (Object.keys(qsoData).length > 0) {
                                    log.qsos.push(qsoData);
                                }
                                break;
                        }
                    }
                }

                log.header.contest = await ContestController.getByName(contest);
                if (!log.header.contest) {
                    throw new error("Contest not found");
                }

                category.contest_id = log.header.contest.id;
                log.header.category = await CategoryController.get(category);
                if (!log.header.category) {
                    throw new error("Category not found");
                }

                res.json(log);
            })
            .catch(error => {
                res.status(500).json({error: error.message});
            });
    }

    async readFileWithDetectedEncoding(filePath) {
        const iconv = require('iconv-lite');
        const buffer = await fs.promises.readFile(filePath);
        let encoding = jschardet.detect(buffer).encoding;

        // fallback to utf8 if encoding is not detected
        if (!iconv.encodingExists(encoding)) {
            encoding = 'utf8';
        }

        return iconv.decode(buffer, encoding);
    }

    parseQso(line) {
        const qsoData = line.split(/\s+/);
        if (qsoData.length > 0) {
            const [freq, mode, date, time, txCall, txRst, txExch, txOv, txLocator, rxCall, rxRst, rxExch, rxOv, rxLocator] = qsoData;
            return new Qso(freq, mode, date, time, new Station(txCall, txRst, txExch, txOv, txLocator), new Station(rxCall, rxRst, rxExch, rxOv, rxLocator));
        }
    }

    get() {
        return this.log;
    }
}

module.exports = new CabrilloController();
