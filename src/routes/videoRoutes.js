import express from 'express';
import { getVideoDetails } from '../controllers/videoController.js';

const router = express.Router();

router.post('/get-details', getVideoDetails);

export default router;
