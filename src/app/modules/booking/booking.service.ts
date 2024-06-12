import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (payload: TBooking) => {

  //get the schedules of the faculties


  const result = await Booking.create(payload);
  return result;
};

const getAllFacilityFromDB = async () => {
  const result = await Booking.find().populate('facility').populate('user');
  return result;
};



export const BookingService = {
  createBookingIntoDB,
  getAllFacilityFromDB,
};
