import { Request } from 'express';
import { responseType } from '../@types/response';
import firebase from '../utils/firebase';
/**
 * QUERY PARAMS
 * Обязательный параметр
 * fb_id - id документа, который нужно получить из firebase
 */
/**
 * Возвращает
 * `{
 *   response: {
 *     status: 200,
 *     time: 0,
 *     type: 'object',
 *     data: null или сам объект
 *   }
 * }`
 */
export default async function collectionGet(
  req: Request,
  firebase: firebase,
  collectionname: string,
) {
  /**
   * Коды ошибок для collectionGet
   * 2 - не указан обязательный query-параметр fb_id
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
    if (req.query['fb_id']) {
      responseObject.response.data = await firebase.get(collectionname, String(req.query['fb_id']));
      const end = new Date();
      responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
      return responseObject;
    } else {
      responseObject.response.status = 2;
      delete responseObject.response.data;
      responseObject.response.type = 'error';
      responseObject.response.errormessage = 'не указан обязательный query-параметр fb_id';
    }
  } catch (err) {
    responseObject.response.status = 16;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'ошибка firebase';
    return responseObject;
  }
}
