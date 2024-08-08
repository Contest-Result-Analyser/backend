import Operator from '../models/operator';
import {getDb} from './databaseController';
import callsignService from "../services/callsignService"

interface IOperator {
    callsign: string;
    license: string;
    owner: string;
    residence: string;
}

class OperatorController {
    private operator: Operator;

    constructor() {
        // @ts-ignore
        this.operator = new Operator({
            callsign: '',
            license: '',
            owner: '',
            residence: ''
        });
    }

    async get(callsign: string): Promise<IOperator | undefined> {
        const db = getDb();
        try {
            return await db<IOperator>('operators').where({callsign: callsign}).first();
        } catch (error) {
            console.error('Error fetching operator:', error);
            throw error;
        }
    }

    async create(operator: IOperator): Promise<number> {
        const db = getDb();
        try {
            const [id]: number[] = await db('operators').insert({
                callsign: operator.callsign,
                license: operator.license,
                owner: operator.owner,
                residence: operator.residence
            });
            return id;
        } catch (error) {
            console.error('Error inserting operator:', error);
            throw error;
        }
    }

    async check(callsign: string) {
        console.log("Callsign: " + callsign);
        const operatorExists = await this.get(callsign);
        if (!operatorExists) {
            const remoteOperator = await callsignService.getCallsignBundesnetzagentur(callsign);

            if (remoteOperator.callsign == callsign) {
                const operatorData: IOperator = {
                    callsign: remoteOperator.callsign,
                    license: remoteOperator.license,
                    owner: remoteOperator.owner,
                    residence: remoteOperator.residence
                };

                await this.create(operatorData);
            }

            return !!remoteOperator;
        }
    }
}

export default new OperatorController();