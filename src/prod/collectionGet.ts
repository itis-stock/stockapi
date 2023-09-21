import { Request } from 'express';
import { responseType } from '../@types/response';
import firebase from '../utils/firebase';

export default async function collectionGet(
  req: Request,
  firebase: firebase,
  collectionname: string,
) {
  const responseObject: responseType = {
    response: {
      status: 200,
      time: 0,
      type: 'object',
      data: null,
    },
  };
  const start = new Date();
  if (req.query['fb_id']) {
    responseObject.response.data = await firebase.get(collectionname, String(req.query['fb_id']));
  } else {
    responseObject.response.status = 1;
    return responseObject;
  }

  const end = new Date();
  responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
  return responseObject;
}
