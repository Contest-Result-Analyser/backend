import * as express from 'express';
import CabrilloController from '../controllers/cabrilloController';

const router = express.Router();

router.get('/parse', CabrilloController.parseFile.bind(CabrilloController));

export default router;