import mongoose from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new mongoose.Schema<TReview>({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const Review = mongoose.model<TReview>('Review', reviewSchema);
