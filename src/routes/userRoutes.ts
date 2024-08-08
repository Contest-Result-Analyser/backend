import * as express from 'express';
import { getUser } from '../controllers/userController';

const router = express.Router();

// @ts-ignore
router.get('/get', getUser);

export default router;