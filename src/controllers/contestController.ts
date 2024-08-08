import { getDb } from '../controllers/databaseController';

class ContestController {
    async getByID(contestID: number): Promise<any> {
        const db = getDb();
        try {
            return await db('contests').where({id: contestID}).first();
        } catch (error) {
            console.error('Error fetching contest:', error);
            throw error;
        }
    }

    async getByName(contestName: string): Promise<any> {
        const db = getDb();
        try {
            return await db('contests').whereRaw('LOWER(name) = ?', [contestName.toLowerCase()]).first();
        } catch (error) {
            console.error('Error fetching contest:', error);
            throw error;
        }
    }
}

export default new ContestController();