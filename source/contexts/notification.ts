import { createContext } from 'react';
import NotificationContextModel from '../components/Notification/notificationContextModel';

const createNotificationContext = createContext<NotificationContextModel>({
  setError: (_error?: boolean) => {},
  setText: (_text?: string) => {},
  setChildren: (_children?) => {},
  setTimer: (_timer?: number) => {},
});
export { createNotificationContext };
