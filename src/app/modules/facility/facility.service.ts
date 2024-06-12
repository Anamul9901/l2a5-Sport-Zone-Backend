import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  const { _id, name, description, pricePerHour, location, isDeleted } = result;
  const finalResult = {
    _id,
    name,
    description,
    pricePerHour,
    location,
    isDeleted,
  };
  return finalResult;
};

const updateFacilityFromDB = async (id: string, payload: TFacility) => {
  const result = await Facility.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  const { _id, name, description, pricePerHour, location, isDeleted }: any =
    result;
  const finalResult = {
    _id,
    name,
    description,
    pricePerHour,
    location,
    isDeleted,
  };
  return finalResult;
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
  const { _id, name, description, pricePerHour, location, isDeleted }: any =
    result;
  const finalResult = {
    _id,
    name,
    description,
    pricePerHour,
    location,
    isDeleted,
  };
  return finalResult;
};

export const FacilityService = {
  createFacilityIntoDB,
  updateFacilityFromDB,
  getAllFacilityFromDB,
  deleteFacilityFromDB,
};
