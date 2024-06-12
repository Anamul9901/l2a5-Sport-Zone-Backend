import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { FacilityValidation } from './facility.validation';
import { FacilityControllers } from './facility.controller';
import auth from '../../middlwares/auth';

const router = express.Router();

router.post(
  '/facility',
  validateRequest(FacilityValidation.createFacilityValidationSchema),
  FacilityControllers.createFacility
);

router.put(
  '/facility/:id',
  validateRequest(FacilityValidation.updateFacilityValidationSchema),
  FacilityControllers.updateFacility
);

router.get('/facility', auth(), FacilityControllers.getAllFacility);

router.delete('/facility/:id', FacilityControllers.deleteFacility);

export const FacilityRoutes = router;
