import * as express from 'express';
import CategoryController from '../controllers/categoryController';

const router = express.Router();
router.get('/test', CategoryController.test);

export default router;