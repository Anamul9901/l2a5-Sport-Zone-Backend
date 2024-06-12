import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  console.log(payload);

  //checking if ther user is exist
  const isUserExists = await User.findOne({ email: payload?.email });
  console.log(isUserExists);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Thsis user is not found !');
  }

  // checking if ther password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password
  );
  console.log(isPasswordMatched);

  return { isUserExists };
};

export const AuthServices = {
  loginUser,
};
