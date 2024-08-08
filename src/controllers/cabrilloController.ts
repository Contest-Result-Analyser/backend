import { Request, Response } from 'express';
import * as fs from 'fs/promises';
import * as jschardet from 'jschardet';
import * as iconv from 'iconv-lite';
import Log from '../models/log';
import Qso from '../models/qso';
import {Station} from '../models/station';
import CategoryController from '../controllers/categoryController';
import ContestController from '../controllers/contestController';
import OperatorController from "./operatorController";

class CabrilloController {
    private filePath: string;

    constructor() {
        this.filePath = './uploads/logs/';
    }

    async parseFile(req: Request, res: Response): Promise<void> {
        const filename = req.query.filename;
        if (!filename) {
            res.status(400).json({error: 'search term parameter is required'});
        }
        try {
            const fileContent = await this.readFileWithDetectedEncoding(this.filePath + filename);
            const log = await this.processLogs(fileContent);
            res.json(log);
        } catch (error: unknown) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message});
            } else {
                res.status(500).json({error: 'An unknown error occured'});
            }
        }
    }

    private async readFileWithDetectedEncoding(filePath: string): Promise<string> {
        const buffer = await fs.readFile(filePath);
        let encoding = jschardet.detect(buffer).encoding;
        if (!iconv.encodingExists(encoding)) {
            encoding = 'utf8';
        }
        return iconv.decode(buffer, encoding);
    }

    private async processLogs(data: string): Promise<any> {
        let content = {
            category: {},
            contest: false,
            log: new Log()
        };
        const lines = data.split('\n');
        for (let line of lines) {
            content = this.parseLine(line, content);
        }
        return await this.handleParsedLog(content);
    }

    private parseLine(line: string, content: any): any {
        line = line.trim();
        if (line && !line.startsWith(';')) {
            const [lineKey, ...valueParts] = line.split(':', 2);
            const lineValue = valueParts.join(':').trim();
            switch (lineKey) {
                case "START-OF-LOG":
                    content.log.header.version = lineValue;
                    break;
                case "CONTEST":
                    content.contest = lineValue;
                    break;
                case "CALLSIGN":
                    content.log.header.callsign = lineValue;
                    break;
                case "LOCATION":
                    content.log.header.location = lineValue;
                    break;
                case "CATEGORY-OPERATOR":
                    content.category.operator = lineValue;
                    break;
                case "CATEGORY-ASSISTED":
                    content.category.assisted = lineValue;
                    break;
                case "CATEGORY-BAND":
                    content.category.band = lineValue;
                    break;
                case "CATEGORY-POWER":
                    content.category.power = lineValue;
                    break;
                case "CATEGORY-MODE":
                    content.category.mode = lineValue;
                    break;
                case "CATEGORY-TRANSMITTER":
                    content.category.transmitter = lineValue;
                    break;
                case "CATEGORY-OVERLAY":
                    content.category.overlay = lineValue;
                    break;
                case "CATEGORY-STATION":
                    content.category.station = lineValue;
                    break;
                case "GRID-LOCATOR":
                    content.log.header.grid.locator = lineValue;
                    break;
                case "CLAIMED-SCORE":
                    content.log.header.claimed.score = lineValue;
                    break;
                case "CLUB":
                    content.log.header.club = lineValue;
                    break;
                case "CREATED-BY":
                    content.log.header.created.by = lineValue;
                    break;
                case "NAME":
                    content.log.header.name = lineValue;
                    break;
                case "ADDRESS":
                    content.log.header.address.push(lineValue);
                    break;
                case "OPERATORS":
                    content.log.header.operators = lineValue.split(",").map(operator => {
                        return operator.trim();
                    });
                    break;
                case "SOAPBOX":
                    if (lineValue.length > 1) {
                        content.log.soapbox.push(lineValue);
                    }
                    break;
                case "END-OF-LOG":
                    break;
                case "QSO":
                    let qsoData = this.parseQso(lineValue);
                    if (qsoData && Object.keys(qsoData).length > 0) {
                        content.log.qsos.push(qsoData);
                    }
                    break;
            }
        }
        return content;
    }

    private async handleParsedLog(content: any): Promise<any> {
        content.log.header.contest = await ContestController.getByName(content.contest);
        if (!content.log.header.contest) {
            throw new Error("Contest not found");
        }
        content.category.contest_id = content.log.header.contest.id;
        content.log.header.category = await CategoryController.get(content.category);
        if (!content.log.header.category) {
            throw new Error("Category not found");
        }

        return content;
    }

    private parseQso(line: string): Qso | undefined {
        const qsoData = line.split(/\s+/);

        if (qsoData.length === 12) {
            const [freq, mode, date, time, txCall, txRst, txOv, txLocator, rxCall, rxRst, rxOv, rxLocator] = qsoData;
            OperatorController.check(txCall);
            OperatorController.check(rxCall);
            return new Qso(freq, mode, date, time, new Station(txCall, txRst, '', txOv, txLocator), new Station(rxCall, rxRst, '', rxOv, rxLocator));
        } else if (qsoData.length === 14){
            const [freq, mode, date, time, txCall, txRst, txExch, txOv, txLocator, rxCall, rxRst, rxExch, rxOv, rxLocator] = qsoData;
            OperatorController.check(txCall);
            OperatorController.check(rxCall);
            return new Qso(freq, mode, date, time, new Station(txCall, txRst, txExch, txOv, txLocator), new Station(rxCall, rxRst, rxExch, rxOv, rxLocator));
        }

        return undefined;
    }
}

export default new CabrilloController();