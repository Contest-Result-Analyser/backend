const {getDb} = require('../controllers/databaseController');

class ContestController {
    async getByID(contestID) {
        const db = getDb();

        try {
            return await db('contests').where({id: contestID}).first();
        } catch (error) {
            console.error('Error fetching contest:', error);
            throw error;
        }
    }
    async getByName(contestName) {
        const db = getDb();

        try {
            return await db('contests').whereRaw('LOWER(name) = ?', [contestName.toLowerCase()]).first();
        } catch (error) {
            console.error('Error fetching contest:', error);
            throw error;
        }
    }
}

module.exports = new ContestController();