export interface LoginResponse {
  statusCode: number;
  message: string;
  data: { accessToken: string };
}

export interface ErrorResponse {
  statusCode: number;
  error: string;
}
