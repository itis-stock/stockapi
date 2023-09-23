import { IncomingHttpHeaders } from 'http';
import firebase from '../utils/firebase';
import { responseType } from '../@types/response';
import { commentType } from '../@types/documents';
import createtitle from '../utils/createtitle';
/**
 * Обязательные
 * author_id: number;
 * course: number;
 * semestr: number;
 * teacher: number;
 * subject: number;
 *
 * Необязательный
 * text: string;
 * photo_urls: string;
 * photo_heights: string;
 * photo_widths: string;
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

export default async function collectionPost(
  headers: IncomingHttpHeaders,
  body: any,
  firebase: firebase,
  collectionname: string,
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
   * 20 - какая-нибудь ссылка из photo_urls некорректна
   * 21 - какое-нибудь значение из photo_heights не число
   * 22 - какое-нибудь значение из photo_widths не число
   */
  const responseObject: responseType = {
    response: {
      status: 200,
      time: 0,
      type: 'post',
    },
  };

  const RegExp =
    /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
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
    const curdate = new Date();
    const data: commentType = {
      year: curdate.getFullYear(),
      author_id: Number(body['author_id']),
      course: Number(body['course']),
      semestr: Number(body['semestr']),
      teacher: body['teacher'],
      subject: body['subject'],
      date: Math.floor(curdate.getTime() / 1000),
      text: body['text'],
      likes: 0,
      attachments: [],
      special: Number(body['author_id']) === 256014823 || Number(body['author_id']) === 719164558,
    };
    const urls = String(body['photo_urls']).split(' ');
    const heights = String(body['photo_heights']).split(' ');
    const widths = String(body['photo_widths']).split(' ');
    for (let i = 0; i < urls.length; i++) {
      if (RegExp.test(urls[i])) {
        if (!Number(heights[i]) && !(Number(heights[i]) >= 0)) {
          responseObject.response.status = 21;
          responseObject.response.type = 'error';
          responseObject.response.errormessage = 'какое-нибудь значение из photo_heights не число';
          return responseObject;
        }
        if (!Number(widths[i]) && !(Number(widths[i]) >= 0)) {
          responseObject.response.status = 22;
          responseObject.response.type = 'error';
          responseObject.response.errormessage = 'какое-нибудь значение из photo_widths не число';
          return responseObject;
        }
        data.attachments.push({
          type: 'photo',
          photo: [
            {
              height: Number(heights[i]),
              width: Number(widths[i]),
              url: urls[i],
            },
          ],
        });
      } else {
        responseObject.response.status = 20;
        responseObject.response.type = 'error';
        responseObject.response.errormessage = 'какая-нибудь ссылка из photo_urls некорректна';
        return responseObject;
      }
    }
    const fb_id = await firebase.set(collectionname, data);
    const metaCount = await firebase.getCount('meta');
    const meta = await firebase.get('meta', String(metaCount));
    const title = createtitle(data.course, data.semestr, data.subject, data.teacher);
    if (meta) {
      if (meta[collectionname][title]) {
        meta[collectionname][title].push(fb_id);
      } else {
        meta[collectionname][title] = [fb_id];
      }
    }

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
