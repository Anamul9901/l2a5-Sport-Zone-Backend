import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser, TUser } from './auth.interface';
import bcrypt from 'bcrypt';

const signUpUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

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
  signUpUserIntoDB,
  loginUser,
};
