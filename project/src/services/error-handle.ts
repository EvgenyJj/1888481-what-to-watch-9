import {ErrorType} from '../types/error';
import {HttpCode} from '../const';
import {toast} from 'react-toastify';
import request from 'axios';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BAD_REQUEST:
        toast.error(response.data.error);
        break;
      case HttpCode.UNAUTHORIZED:
        break;
      case HttpCode.NOT_FOUND:
        toast.error(response.data.error);
        break;
    }
  }
};
