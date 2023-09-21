import { responseType } from '../@types/response';
import firebase from '../utils/firebase';
/**
 * возвращает все документы из коллекции
 * @param firebase класс firebase
 * @param collectionname название коллекции
 * @returns объект responseType
 */
export default async function collectionGetAll(firebase: firebase, collectionname: string) {
  /**
   * Коды ошибок
   * 3 - firebase возвращает пустой массив
   */
  const responseObject: responseType = {
    response: {
      status: 200,
      time: 0,
      type: 'array',
      data: null,
      count: 0,
    },
  };
  const start = new Date();
  responseObject.response.data = (await firebase.getAll(collectionname)).map((el) => el.data);
  responseObject.response.count = responseObject.response.data.length;
  if (!responseObject.response.data) {
    delete responseObject.response.data;
    delete responseObject.response.count;
    responseObject.response.status = 3;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'firebase возвращает пустой массив';
  }
  const end = new Date();
  responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
  return responseObject;
}
