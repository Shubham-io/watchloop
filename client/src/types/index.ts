export interface User {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverImage?: string;
}

export type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};
