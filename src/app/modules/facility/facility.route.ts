import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { FacilityValidation } from './facility.validation';
import { FacilityControllers } from './facility.controller';
import auth from '../../middlwares/auth';
import { USET_ROLE } from './facility.constant';

const router = express.Router();

router.post(
  '/facility',
  auth(USET_ROLE.admin),
  validateRequest(FacilityValidation.createFacilityValidationSchema),
  FacilityControllers.createFacility
);

router.put(
  '/facility/:id',
  auth(USET_ROLE.admin),
  validateRequest(FacilityValidation.updateFacilityValidationSchema),
  FacilityControllers.updateFacility
);

router.get('/facility', FacilityControllers.getAllFacility);

router.delete(
  '/facility/:id',
  auth(USET_ROLE.admin),
  FacilityControllers.deleteFacility
);

export const FacilityRoutes = router;
