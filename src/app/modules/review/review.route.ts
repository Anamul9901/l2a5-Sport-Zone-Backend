import express from 'express';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.post('/review', ReviewControllers.createReview);

router.get('/review', ReviewControllers.getAllReview);

export const ReviewRouters = router;
