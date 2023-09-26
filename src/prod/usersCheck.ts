import { Request } from 'express';
import firebase from '../utils/firebase';
import { responseType } from '../@types/response';
/**
 *
 * @param req
 * @param firebase
 */
export default async function usersCheck(req: Request, firebase: firebase) {
  const responseObject: responseType = {
    response: {
      status: 200,
      time: 0,
      type: 'object',
    },
  };
  /**
   * Коды ошибок
   * 2 - не указан обязательный query-параметр fb_id
   * 16 - ошибка firebase
   */
  const start = new Date();
  try {
    if (req.query['fb_id']) {
      responseObject.response.data = await firebase.get('users', String(req.query['fb_id']));
      const end = new Date();
      responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
      return responseObject;
    } else {
      responseObject.response.status = 2;
      delete responseObject.response.data;
      responseObject.response.type = 'error';
      responseObject.response.errormessage = 'не указан обязательный параметр fb_id';
    }
  } catch (err) {
    responseObject.response.status = 16;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'ошибка firebase';
    return responseObject;
  }
}
