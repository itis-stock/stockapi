import { responseType } from "../@types/response";
import firebase from "../utils/firebase";
import { Request } from "express";

export default async function teachersGet(req: Request, firebase: firebase) {
  const responseObject: responseType = {
    response: {
      status: 200,
      time: 0,
      type: "object",
      data: null,
    },
  };
  const start = new Date();
  if (req.query["fb_id"]) {
    responseObject.response.data = await firebase.get(
      "teachers",
      String(req.query["fb_id"]),
    );
  } else {
    responseObject.response.status = 1;
    return responseObject;
  }

  const end = new Date();
  responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
  return responseObject;
}
