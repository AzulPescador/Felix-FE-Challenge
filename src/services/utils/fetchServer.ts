import axios, { AxiosError, Method } from 'axios';
import axiosInstance from './AxiosInstance';

class FetchApiError {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}
interface Props {
  method: Method | undefined;
  url: string;
  headers?: NonNullable<unknown>;
  data?: NonNullable<unknown>;
  params?: URLSearchParams;
  useToken?: boolean;
}

interface ErrorResponse {
  message: string;
}

export const fetchServer = async ({
  method,
  url,
  headers = {},
  data = {},
  params,
}: Props) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const axiosError = e as AxiosError;
      const responseData = axiosError.response?.data as ErrorResponse;
      throw new FetchApiError(
        axiosError.response?.status || 500,
        responseData.message || 'Something went wrong. Please try again.'
      );
    }
    throw new FetchApiError(500, 'Something went wrong. Please try again.');
  }
};
