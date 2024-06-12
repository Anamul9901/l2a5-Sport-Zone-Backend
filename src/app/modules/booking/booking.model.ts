import mongoose, { Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new mongoose.Schema<TBooking>({
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  facility: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Facility',
  },
  payableAmount: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'canceled'],
  },
});

export const Booking = mongoose.model<TBooking>('Bookink', bookingSchema);
