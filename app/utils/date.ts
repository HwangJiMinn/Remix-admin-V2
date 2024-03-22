import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale('ko');
dayjs.extend(localizedFormat);

// * 날짜 locale format
export const localizedFormatDate = (date: Date | string, format: string = 'LL') => {
  return dayjs(date).format(format);
};

// * 날짜 format
export const formatDate = (date: Date | string, format: string = 'YYYY.MM.DD') => {
  return dayjs(date).format(format);
};
