const {getDb} = require('../controllers/databaseController');

class CategoryController {
    constructor(){
        this.get = this.get.bind(this);
        this.test = this.test.bind(this);
    }

    async test(req, res) {
        const id = req.query.id;

        if (!id) {
            return res.status(400).json({error: 'search term parameter is required'});
        }

        try {
            const category = await this.get({band: "432"});
            res.json(category);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async get(searchCategory) {
        const db = getDb();

        try {
            return await db('categories').where(searchCategory).first();
        } catch (error) {
            console.error('Error fetching category:', error);
            throw error;
        }
    }
}

module.exports = new CategoryController();
