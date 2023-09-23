import { IncomingHttpHeaders } from 'http';
import { documentType } from '../@types/documents';
import { responseType } from '../@types/response';
import firebase from '../utils/firebase';

/**
 * обязательные параметры
 * "author_id": number
 * "url": string
 * "course": number
 * "semestr": number
 * "subject": string
 * "teacher": string
 * необязательные параметры
 * "title": string
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
/**
 *
 * @param headers
 * @param body
 * @param firebase
 * @returns
 */
export default async function docsPost(
  headers: IncomingHttpHeaders,
  body: any,
  firebase: firebase,
) {
  /**
   * Коды ошибок
   * 0 - не указан в headers master_key или указан неправильно
   * 4 - не указан обязательный параметр author_id
   * 5 - параметр author_id не число
   * 6 - не указан обязательный параметр url
   * 7 - некорректный url
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
  const RegExp =
    /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
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

  if (!body['url']) {
    responseObject.response.status = 6;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'не указан обязательный параметр url';
    return responseObject;
  }

  if (!RegExp.test(body['url'])) {
    responseObject.response.status = 7;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'некорректный url';
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

    const curdate = new Date();
    const data: documentType = {
      url: body['url'],
      year: curdate.getFullYear(),
      author_id: Number(body['author_id']),
      course: Number(body['course']),
      semestr: Number(body['semestr']),
      teacher: body['teacher'],
      subject: body['subject'],
      date: Math.floor(curdate.getTime() / 1000),
      title: body['title'] || null,
      likes: 0,
      special: Number(body['author_id']) === 256014823 || Number(body['author_id']) === 719164558,
    };
    const fb_id = await firebase.set('docs', data);
    const metaCount = await firebase.getCount('meta');
    const meta = await firebase.get('meta', String(metaCount));
    meta?.docs.push({
      course: Number(body['course']),
      fb_id,
      semestr: Number(body['semestr']),
      subject: body['subject'],
      teacher: body['teacher'],
      title: body['title'] || null,
      year: curdate.getFullYear(),
    });
    await firebase.setdoc('meta', String(metaCount + 1), meta);
    const end = new Date();
    responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
    responseObject.response.data = fb_id;
    return responseObject;
  } catch (err) {
    responseObject.response.status = 16;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'ошибка firebase';
    return responseObject;
  }
}
