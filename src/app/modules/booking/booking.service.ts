import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Facility } from '../facility/facility.model';

const createBookingIntoDB = async (payload: TBooking) => {
  const { date, startTime, endTime, facility } = payload;

  //get the all schedules of the faculties
  const assignedSchedules = await Booking.find({
    facility,
    date: { $in: date },
  }).select('date startTime endTime isBooked');

  // if any schedule booked canceled, then it's not count
  const assignedValidSchedules = assignedSchedules.filter(
    (schedule) => schedule.isBooked !== 'canceled'
  );

  const newSchedule = {
    date,
    startTime,
    endTime,
  };

  assignedValidSchedules.forEach((schedule) => {
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

  // find the facility
  const facilityData = await Facility.findById(facility);
  if (!facilityData) {
    throw new AppError(httpStatus.NOT_FOUND, `This Facility is not found!`);
  }

  // if facility is deleted, then throw error
  const isValidFacilityData = Object.values(facilityData).find(
    (facility) => facility?.isDeleted === true
  );
  if (isValidFacilityData) {
    throw new AppError(httpStatus.NOT_FOUND, `This Facility is Deleted!`);
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

const getAvailabilFacilityFromDB = async (date: any) => {
  const date2 = date.date;
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const startDate = date2 ? date2 : formattedDate;
  // Retrieve bookings for the specified date
  const bookings = await Booking.find({ date: startDate }).select(
    'date startTime endTime isBooked'
  );
  console.log('bookings-----------------------:', bookings);

  // 24 hours time slots(1h).
  interface TimeSlot {
    startTime: string;
    endTime: string;
  }
  
  const generateAllDayTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 0; hour < 24; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
      slots.push({ startTime, endTime });
    }
    return slots;
  };
  
  const availableTimeSlots = generateAllDayTimeSlots();
  console.log(availableTimeSlots);
  

  const filterBookedTimeSlots = (timeSlots: any[], bookings: any[]) => {
    const bookedSlots = bookings.map((booking) => ({
      startTime: new Date(`1970-01-10T${booking.startTime}:00`),
      endTime: new Date(`1970-01-10T${booking.endTime}:00`),
    }));
    console.log('filtered booked slots:', bookedSlots);

    return timeSlots.filter((slot) => {
      return !bookedSlots.some((bookedSlot) => {
        const slotStartTime = new Date(`1970-01-10T${slot.startTime}:00`);
        const slotEndTime = new Date(`1970-01-10T${slot.endTime}:00`);

        return (
          slotStartTime < bookedSlot.endTime &&
          slotEndTime > bookedSlot.startTime
        );
      });
    });
  };

  // available time slots
  const availableSlots = filterBookedTimeSlots(availableTimeSlots, bookings);

  return availableSlots;
};

const getSingleFacilityFromDB = async (userId: string) => {
  const result = await Booking.find({ user: userId }).populate('facility');
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
  getAvailabilFacilityFromDB,
  deleteFacilityFromDB,
};
