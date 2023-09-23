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
   * 17 - не указан ни text, ни photo_urls
   * 18 - указан photo_urls, но не указан photo_heights
   * 19 - указан photo_urls, но не указан photo_widths
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

  if (!body['author_id']) {
    responseObject.response.status = 4;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'не указан обязательный параметр author_id';
    return responseObject;
  }

  if (!Number(body['author_id']) && !(Number(body['author_id']) >= 0)) {
    responseObject.response.status = 5;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'параметр author_id не число';
    return responseObject;
  }

  if (!body['course']) {
    responseObject.response.status = 8;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'не указан обязательный параметр course';
    return responseObject;
  }

  if (!Number(body['course']) && !(Number(body['course']) >= 0)) {
    responseObject.response.status = 9;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'параметр course не число';
    return responseObject;
  }

  if (!body['semestr']) {
    responseObject.response.status = 10;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'не указан обязательный параметр semestr';
    return responseObject;
  }

  if (!Number(body['semestr']) && !(Number(body['semestr']) >= 0)) {
    responseObject.response.status = 11;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'параметр semestr не число';
    return responseObject;
  }

  if (!body['teacher']) {
    responseObject.response.status = 12;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'не указан обязательный параметр teacher';
    return responseObject;
  }

  if (!body['subject']) {
    responseObject.response.status = 13;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'не указан обязательный параметр subject';
    return responseObject;
  }

  if (!body['text'] && !body['photo_urls']) {
    responseObject.response.status = 17;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'не указан ни text, ни photo_urls';
    return responseObject;
  }

  if (body['photo_urls'] && !body['photo_heights']) {
    responseObject.response.status = 18;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'указан photo_urls, но не указан photo_heights';
    return responseObject;
  }

  if (body['photo_urls'] && !body['photo_widths']) {
    responseObject.response.status = 19;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'указан photo_urls, но не указан photo_widths';
    return responseObject;
  }

  try {
    const list = await firebase.getAll('list');
    const listparsed = [
      ...list.map((el) => el.data.items)[0],
      ...list.map((el) => el.data.items)[1],
    ];

    if (!listparsed.includes(body['teacher'])) {
      responseObject.response.status = 14;
      responseObject.response.type = 'error';
      responseObject.response.errormessage = 'некорректный teacher';
      return responseObject;
    }

    if (!listparsed.includes(body['subject'])) {
      responseObject.response.status = 15;
      responseObject.response.type = 'error';
      responseObject.response.errormessage = 'некорректный subject';
      return responseObject;
    }

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
