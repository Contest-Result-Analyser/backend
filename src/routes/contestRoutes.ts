import * as express from 'express';
const router = express.Router();
import ContestController from '../controllers/contestController';
import CallsignController from '../controllers/callsignController';

router.get('/get/name', ContestController.getByName.bind(ContestController));
router.get('/get/id', ContestController.getByID.bind(ContestController));

export default router;