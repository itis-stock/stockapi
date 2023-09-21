import { responseType } from '../@types/response';
import firebase from '../utils/firebase';

export default async function collectionGetAll(firebase: firebase, collectionname: string) {
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
  const end = new Date();
  responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
  return responseObject;
}