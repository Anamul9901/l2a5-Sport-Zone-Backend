import { model, Schema } from 'mongoose';
import { TFacility } from './facility.interface';

const facilitySchema = new Schema<TFacility>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Facility = model<TFacility>('Facility', facilitySchema);
