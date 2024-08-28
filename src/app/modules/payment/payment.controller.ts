import { Request, Response } from 'express';
import { paymentServices } from './payment.service';

const confirmationController = async (req: Request, res: Response) => {
  const result = await paymentServices.confirmationService(
    req.query.transactionId as string
  );
  res.send(`<h1>Payment success</h1>`);
};

export const paymentController = {
  confirmationController,
};
