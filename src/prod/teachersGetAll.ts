import { responseType } from "../@types/response";
import firebase from "../utils/firebase";

export default async function docsGetAll(firebase: firebase) {
  const responseObject: responseType = {
    response: {
      status: 200,
      time: 0,
      type: "array",
      data: null,
      count: 0,
    },
  };
  const start = new Date();
  responseObject.response.data = (await firebase.getAll("teachers")).map(
    (el) => el.data,
  );
  responseObject.response.count = responseObject.response.data.length;
  const end = new Date();
  responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
  return responseObject;
}
