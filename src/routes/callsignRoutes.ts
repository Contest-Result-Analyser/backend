import * as express from 'express';
import CallsignController from '../controllers/callsignController';

const router = express.Router();

router.get('/operator/get', CallsignController.getCallsign.bind(CallsignController));

export default router;