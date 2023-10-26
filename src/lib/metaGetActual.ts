import { responseType } from '../@types/response';
import firebase from '../utils/firebase';

export default async function metaGetActual(firebase: firebase) {
  /**
   * Коды ошибок
   * 16 - ошибка firebase
   */
  const responseObject: responseType = {
    response: {
      status: 200,
      time: 0,
      type: 'object',
      data: null,
    },
  };
  const start = new Date();
  try {
    const metaCount = await firebase.getCount('meta');
    const meta = await firebase.get('meta', String(metaCount));
    responseObject.response.data = meta;
    const end = new Date();
    responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
    return responseObject;
  } catch (err) {
    responseObject.response.status = 16;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'ошибка firebase';
    return responseObject;
  }
}
