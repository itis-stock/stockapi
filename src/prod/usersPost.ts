import { IncomingHttpHeaders } from 'http';
import firebase from '../utils/firebase';
import { responseType } from '../@types/response';
/**
 * Обязательные
 * id_vk: number;
 * name_vk: string;
 * telegram_nickname: string;
 * group: string;
 * Необязательный
 * noise: boolean;
 * photo_url: string;
 * hidden: boolean;
 * display_name: string;
 * description: string;
 */

/**
 *
 * @param headers
 * @param body
 * @param firebase
 */
export default async function usersPost(
  headers: IncomingHttpHeaders,
  body: any,
  firebase: firebase,
) {
  /**
   * Коды ошибок
   * 0 - не указан в headers master_key или указан неправильно
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
