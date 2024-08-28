/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const initiatePayment = async (paymentData: any) => {
  const responst = await axios.post(process.env.PAYMENT_URL!, {
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNETURE_KEY,
    tran_id: paymentData.transactionId,
    success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.transactionId}`,
    fail_url: 'http://www.merchantdomain.com/failedpage.html',
    cancel_url: 'http://www.merchantdomain.com/cancellpage.html',
    amount: paymentData.totalPrice,
    currency: 'BDT',
    desc: 'Merchant Registration Payment',
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: 'N/A',
    cus_city: 'N/A',
    cus_state: 'N/A',
    cus_postcode: 'N/A',
    cus_country: 'N/A',
    cus_phone: paymentData.customerPhone,
    type: 'json',
  });

  return responst.data;
};

export const verifyPayment = async (tnxId: string) => {
  const response = await axios.get(process.env.PAYMENT_VERIFY_URL!, {
    params: {
      store_id: process.env.STORE_ID,
      signature_key: process.env.SIGNETURE_KEY,
      type: 'json',
      request_id: tnxId,
    },
  });

  return response.data;
};
