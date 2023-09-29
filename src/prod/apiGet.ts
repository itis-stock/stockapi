import { responseType } from '../@types/response';
import firebase from '../utils/firebase';

export default async function apiGet(firebase: firebase) {
  const responseObject: responseType = {
    response: {
      status: 200,
      time: 0,
      type: 'array',
      data: null,
    },
  };
  const start = new Date();
  try {
    const count = await firebase.getCount('documentary');
    const data = await firebase.get('documentary', String(count));
    responseObject.response.data = data?.data || null;
    responseObject.response.count = data?.data.length || 0;
    const end = new Date();
    responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
    return responseObject;
  } catch (err) {
    console.log(err);
    responseObject.response.status = 16;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'ошибка Firebase';
    return responseObject;
  }
}
