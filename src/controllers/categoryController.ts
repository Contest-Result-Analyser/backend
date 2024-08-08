import { getDb } from '../controllers/databaseController';
import { Request, Response } from 'express';

interface Category {
    band: string;
}

class CategoryController {
    constructor() {
        this.get = this.get.bind(this);
        this.test = this.test.bind(this);
    }
    async test(req: Request, res: Response) {
        const id = req.query.id;
        if (!id) {
            res.status(400).json({ error: 'search term parameter is required' });
            return;
        }
        try {
            const category = await this.get({ band: "432" });
            res.json(category);
        } catch (error) {
            // @ts-ignore
            res.status(500).json({ error: error.message });
        }
    }
    async get(searchCategory: Category) {
        const db = getDb();

        try {
            return await db('categories').where(searchCategory).first();
        } catch (error) {
            console.error('Error fetching category:', error);
            throw error;
        }
    }
}

export default new CategoryController();