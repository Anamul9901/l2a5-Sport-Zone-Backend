import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { BookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';
import auth from '../../middlwares/auth';
import { USET_ROLE } from '../facility/facility.constant';

const router = express.Router();

router.post(
  '/bookings',
  auth(USET_ROLE.user),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking
);

router.get('/bookings', auth(USET_ROLE.admin), BookingControllers.getAllBooking);

router.get('/bookings/user', auth(USET_ROLE.user), BookingControllers.getSingleBooking);

router.get('/check-availability', BookingControllers.getAvailabilBooking);

router.delete('/bookings/:id', auth(USET_ROLE.user), BookingControllers.deleteBooking);

export const BookingRoutes = router;
