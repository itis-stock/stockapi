import { IncomingHttpHeaders } from 'http';
import firebase from '../utils/firebase';
import { responseType } from '../@types/response';
/**
 * Обязательные
 * id_vk: number;
 * name_vk: string;
 * telegram_nickname: string;
 * group: string;
 *
 * Необязательный
 * noise: boolean;
 * photo_url: string;
 * hidden: boolean;
 * display_name: string;
 * description: string;
 */
/**
 * Возвращает
 * {
 *  response: {
 *    status: 200,
 *    time: 0,
 *    type: 'post',
 *    data: fb_id (id файла, который был добавлен)
 *  }
 * }
 */

export default async function usersPost(
  headers: IncomingHttpHeaders,
  body: any,
  firebase: firebase,
) {
  /**
   * Коды ошибок
   * 0 - не указан в headers master_key или указан неправильно
   * 16 - ошибка firebase
   * 23 - не указан обязательный параметр id_vk
   * 24 - параметр id_vk не число
   * 25 - не указан обязательный параметр name_vk
   * 26 - не указан обязательный параметр telegram_nickname
   * 27 - не указан обязательный параметр group
   * 28 - параметр noise не булево значение
   * 29 - параметр hidden не булево значение
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
