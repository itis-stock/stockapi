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
  const responseObject: responseType = {
    response: {
      status: 200,
      time: 0,
      type: 'post',
    },
  };
}
