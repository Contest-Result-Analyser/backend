const fs = require('fs');
const Log = require('../models/operator');
const { getDb } = require('../controllers/databaseController');

class OperatorController {
    constructor() {
        this.log = new Log();
    }
    async get(callsign) {
        const db = getDb();

        try {
            return await db('operators').where({callsign: callsign}).first();
        } catch (error) {
            console.error('Error fetching operator:', error);
            throw error;
        }
    }

    async create(operator){
        const db = getDb();

        try {
            const [id] = await db('operators').insert({
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
}

module.exports = new OperatorController();
