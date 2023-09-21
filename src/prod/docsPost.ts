import { documentType } from '../@types/documents';

/**
 * обязательные параметры
 * "author_id": number
 * "url": string
 * необязательные параметры
 * "course": number
 * "semestr": number
 * "subject": string
 * "teacher": string
 * "title": string
 */
export default async function docsPost(body: any) {
  if (!body['author_id']) {
    return {
      response: {
        status: 401,
      },
    };
  }
  if (!body['url']) {
    return {
      response: {
        status: 402,
      },
    };
  }
  if (!body['url'].includes('https') || !body['url'].includes('http')) {
    return {
      response: {
        status: 403,
      },
    };
  }
  /**
   * четверка важных = semestr, course, teacher, subject
   * нужно проверить, что есть title, то четверка важных может и существовать и не существовать
   * нужно проверить, что если title не существует, то обязательна должна быть вся четверка важных
   * нужно проверить, что если четверка важных существует, то course и semestr - числа
   */
  const curdate = new Date();
  const data: documentType = {
    url: body['url'],
    year: curdate.getFullYear(),
    author_id: Number(body['author_id']),
    course: Number(body['course']) || null,
    semestr: Number(body['semestr']) || null,
    teacher: body['teacher'] || null,
    subject: body['subject'] || null,
    date: Math.floor(curdate.getTime() / 1000),
    title: body['title'] || null,
    likes: 0,
    special: Number(body['author_id']) === 256014823 || Number(body['author_id']) === 719164558,
  };
  return data;
}
