import { Request, Response } from 'express';
import { responseType } from '../@types/response';
import firebase from '../utils/firebase';

export default async function docsget(req: Request, firebase: firebase) {
  const sueta: responseType = {
    response: {
      status: 200,
      time: 0,
      type: 'object',
      data: null,
    },
  };
  const start = new Date();
  if (req.query['fb_id']) {
    const buffer = await firebase.get('docs', String(req.query['fb_id']));
    sueta.response.data = buffer;
  } else {
    sueta.response.status = 1;
    return sueta;
  }

  const end = new Date();
  sueta.response.time = (end.getTime() - start.getTime()) / 1000;
  return sueta;
}
