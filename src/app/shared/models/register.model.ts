export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterResponse {
  message: string;
}

export interface ILogoutResponse {
  message:string
}