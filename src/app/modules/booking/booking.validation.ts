import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Invalid date format, should be YYYY-MM-DD'
      ),
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, 'Invalid time format, should be HH:MM'),
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, 'Invalid time format, should be HH:MM'),
    user: z.string(),
    facility: z.string(),
    payableAmount: z.number().nonnegative(),
    isBooked: z.enum(['confirmed', 'unconfirmed', 'canceled']),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
};
