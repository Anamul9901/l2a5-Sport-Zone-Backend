/* eslint-disable @typescript-eslint/no-explicit-any */
import { initiatePayment } from '../payment/payment.utils';
import Order from './order.model';

const createOrder = async (orderData: any) => {
  const { user, totalPrice, facility, date, startTime, endTime } = orderData;

  const transactionId = `TXN-${Date.now()}`;
  const order = new Order({
    user,
    totalPrice,
    facility,
    status: 'Pending',
    paymentStatus: 'Pending',
    transactionId,
    date,
    startTime,
    endTime,
  });

  await order.save();

  const paymentData = {
    transactionId,
    totalPrice,
    customerName: user.name,
    customerEmail: user.email,
    customerPhone: user.phone,
    customerAddress: user.address,
  };

  //Payment
  const paymentSession = await initiatePayment(paymentData);

  return paymentSession;
};

const getAllOrderFromDB = async () => {
  const result = await Order.find().populate('facility');
  return result;
};

export const orderService = {
  createOrder,
  getAllOrderFromDB,
};
