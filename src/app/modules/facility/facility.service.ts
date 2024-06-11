import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const updateFacilityFromDB = async (id: string, payload: TFacility) => {
  const result = await Facility.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const getAllFacilityFromDB = async () => {
  const result = await Facility.find();
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const FacilityService = {
  createFacilityIntoDB,
  updateFacilityFromDB,
  getAllFacilityFromDB,
  deleteFacilityFromDB,
};
