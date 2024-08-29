import { Router } from 'express';
import { FacilityRoutes } from '../modules/facility/facility.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { orderRoutes } from '../modules/order/order.router';
import { paymentRoutes } from '../modules/payment/payment.route';
import { ReviewRouters } from '../modules/review/review.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/',
    route: FacilityRoutes,
  },
  {
    path: '/',
    route: BookingRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
  {
    path: '/',
    route: ReviewRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
