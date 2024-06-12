import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { FacilityRoutes } from '../modules/facility/facility.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/',
    route: FacilityRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
