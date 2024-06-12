import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityService } from './facility.service';

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.createFacilityIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityService.updateFacilityFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility updated successfully',
    data: result,
  });
});

const getAllFacility = catchAsync(async (req, res) => {
  console.log('test', req.user);
  const result = await FacilityService.getAllFacilityFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityService.deleteFacilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility deleted successfully',
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacility,
  getAllFacility,
  deleteFacility,
};
