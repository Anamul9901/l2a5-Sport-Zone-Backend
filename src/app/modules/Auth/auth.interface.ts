/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TUser {
  post: any;
  pre: any;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
}

export type TLoginUser = {
  email: string;
  password: string;
};


