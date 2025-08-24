import { ToastConfig } from 'react-native-toast-message';
import {
  SuccessToast,
  InfoToast,
  WarningToast,
  ErrorToast,
} from '../components/Toast';

export const toastConfig: ToastConfig = {
  success: SuccessToast,
  info: InfoToast,
  warning: WarningToast,
  error: ErrorToast,
};
