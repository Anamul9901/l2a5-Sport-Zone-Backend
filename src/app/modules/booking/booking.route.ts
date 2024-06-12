import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { BookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking
);

router.get('/', BookingControllers.getAllBooking);

export const BookingRoutes = router;
