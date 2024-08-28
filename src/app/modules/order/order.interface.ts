import { Types } from 'mongoose';

export type TOrder = {
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  facility: Types.ObjectId;
  totalPrice: number;
  status?: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  paymentStatus?: 'Pending' | 'Paid' | 'Failed';
  transactionId: string;
};
