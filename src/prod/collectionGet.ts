import { Request } from 'express';
import { responseType } from '../@types/response';
import firebase from '../utils/firebase';
/**
 * обобщенная функция для получения одного документа из определенной коллекции
 * @param req request для получения параметров
 * @param firebase класс firebase для отправки запросов на firebase
 * @param collectionname название коллекции
 * @returns объект responseType
 */
export default async function collectionGet(
  req: Request,
  firebase: firebase,
  collectionname: string,
) {
  /**
   * Коды ошибок для collectionGet
   * 1 - неправильный fb_id (firebase возвращает null)
   * 2 - не существует параметра fb_id
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
  if (req.query['fb_id']) {
    responseObject.response.data = await firebase.get(collectionname, String(req.query['fb_id']));
    if (!responseObject.response.data) {
      responseObject.response.status = 1;
      delete responseObject.response.data;
      responseObject.response.type = 'error';
      responseObject.response.errormessage = 'неправильный fb_id (firebase возвращает null)';
    }
  } else {
    responseObject.response.status = 2;
    delete responseObject.response.data;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'не существует параметра fb_id';
  }

  const end = new Date();
  responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
  return responseObject;
}
