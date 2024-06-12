import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z
    .object({
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
    })
    .refine(
      (body) => {
        //startTime : 10:30  => 1970-01-10T10:30
        //endTime : 10:30  => 1970-01-10T12:30

        const start: any = new Date(`1970-01-10T${body.startTime}:00`);
        const end: any = new Date(`1970-01-10T${body.endTime}:00`);
        // console.log('start:---', start);
        // console.log('end:---', end);
        // const differenceInMilliseconds = end - start;
        // const differenceInHours = differenceInMilliseconds / 3600000;
        // console.log('Difference in hours:---', differenceInHours);

        return end > start;
      },
      {
        message: 'Start time should be before End time !',
      }
    ),
});

export const BookingValidation = {
  createBookingValidationSchema,
};
