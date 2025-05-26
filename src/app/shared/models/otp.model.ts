export interface IOtpVerifyRequest {
  email: string;
  otp: string;
}

export interface IOtpVerifyResponse {
  message: string;
  token: string;
}