import { IUser } from "./user.model";

export interface IErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  key?:string
}

export interface IVerifyTokenResponse {
  token: string;
  user: IUser;
  message: string;    
}