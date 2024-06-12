import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Facility } from '../facility/facility.model';
import { JwtPayload } from 'jsonwebtoken';

const createBookingIntoDB = async (payload: TBooking) => {
  const { date, startTime, endTime, facility } = payload;

  //get the schedules of the faculties
  const assignedSchedules = await Booking.find({
    facility,
    date: { $in: date },
  }).select('date startTime endTime');

  const newSchedule = {
    date,
    startTime,
    endTime,
  };

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

  //create payableAmount
  const facilityData = await Facility.findById(facility);
  if (!facilityData) {
    throw new AppError(httpStatus.NOT_FOUND, `This Facility is not found!`);
  }

  const pricePerHour = facilityData?.pricePerHour;
  const start: any = new Date(`1970-01-10T${newSchedule.startTime}:00`);
  const end: any = new Date(`1970-01-10T${newSchedule.endTime}:00`);
  const differenceInMilliseconds = end - start;
  const differenceInHours = differenceInMilliseconds / 3600000;

  const payableAmount = Number(pricePerHour) * differenceInHours;

  const result = await Booking.create({ ...payload, payableAmount });
  return result;
};

const getAllFacilityFromDB = async () => {
  const result = await Booking.find().populate('facility');
  return result;
};

const getSingleFacilityFromDB = async (userId: string) => {
  const result = await Booking.find({ user: userId });
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: 'canceled' },
    { new: true }
  );
  return result;
};
export const BookingService = {
  createBookingIntoDB,
  getAllFacilityFromDB,
  getSingleFacilityFromDB,
  deleteFacilityFromDB,
};
