import { IncomingHttpHeaders } from 'http';
import firebase from '../utils/firebase';
import { responseType } from '../@types/response';
/**
 * Обязательные
 * author_id: number;
 * course: number;
 * semestr: number;
 * teacher: number;
 * subject: number;
 * Необязательный
 * text: string;
 * photo_urls: string;
 * photo_heights: string;
 * photo_widths: string;
 */

/**
 *
 * @param headers
 * @param body
 * @param firebase
 */
export default async function collectionPost(
  headers: IncomingHttpHeaders,
  body: any,
  firebase: firebase,
) {
  /**
   * Коды ошибок
   * 0 - не указан в headers master_key или указан неправильно
   * 4 - не указан обязательный параметр author_id
   * 5 - параметр author_id не число
   * 8 - не указан обязательный параметр course
   * 9 - параметр course не число
   * 10 - не указан обязательный параметр semestr
   * 11 - параметр semestr не число
   * 12 - не указан обязательный параметр teacher
   * 13 - не указан обязательный параметр subject
   * 14 - некорректный teacher
   * 15 - некорректный subject
   * 16 - ошибка firebase
   */
  const responseObject: responseType = {
    response: {
      status: 200,
      time: 0,
      type: 'post',
    },
  };
  const start = new Date();
  if (headers['master_key'] !== process.env.MASTER_KEY) {
    responseObject.response.status = 0;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'не указан в headers master_key или указан неправильно';
    return responseObject;
  }
  const end = new Date();
  responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
  return responseObject;
}
