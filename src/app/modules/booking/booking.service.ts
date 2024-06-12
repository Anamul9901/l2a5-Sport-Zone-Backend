import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (payload: TBooking) => {
  const { date, startTime, endTime, user, facility, payableAmount } = payload;

  //get the schedules of the faculties
  const assignedSchedules = await Booking.find({
    facility,
    date: { $in: date },
  }).select('date startTime endTime');
  console.log('assignedSchedules:', assignedSchedules);

  const newSchedule = {
    date,
    startTime,
    endTime,
  };
  // console.log("newSchedule:", newSchedule);

  assignedSchedules.forEach((schedule) => {
    const existingStartTime: any = new Date(
      `1970-01-10T${schedule.startTime}:00`
    );
    const existingEndTime: any = new Date(`1970-01-10T${schedule.endTime}:00`);
    const newStartTime: any = new Date(
      `1970-01-10T${newSchedule.startTime}:00`
    );
    const newEndTime: any = new Date(`1970-01-10T${newSchedule.endTime}:00`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      throw new AppError(
        httpStatus.CONFLICT,
        `This Facility is not available at that time! Chooes other time or day`
      );
    }
  });

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
