import { IncomingHttpHeaders } from "http";
import firebase from "../utils/firebase";
import { responseType } from "../@types/response";
import { userType } from "../@types/documents";
/**
 * BODY PARAMS
 * Обязательные
 * id_vk: number;
 * name_vk: string;
 * telegram_nickname: string;
 * group: string;
 *
 * Необязательный
 * photo_url: string;
 * display_name: string; длина от 1 до 40 включительно
 * description: string; длина от 1 до 40 включительно
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

export default async function usersPost(
  headers: IncomingHttpHeaders,
  body: any,
  firebase: firebase,
) {
  /**
   * Коды ошибок
   * 0 - не указан в headers master_key или указан неправильно
   * 16 - ошибка firebase
   * 23 - не указан обязательный параметр id_vk
   * 24 - параметр id_vk не число
   * 25 - не указан обязательный параметр name_vk
   * 26 - не указан обязательный параметр telegram_nickname
   * 27 - не указан обязательный параметр group
   * 28 - параметр noise не булево значение
   * 29 - параметр hidden не булево значение
   * 30 - description некорректного типа
   * 31 - display_name некорректного типа
   * 32 - photo_url некорректного типа
   */
  const RegExp =
    /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

  const responseObject: responseType = {
    response: {
      status: 200,
      time: 0,
      type: "post",
    },
  };
  const start = new Date();
  if (headers["master_key"] !== process.env.MASTER_KEY) {
    responseObject.response.status = 0;
    responseObject.response.type = "error";
    responseObject.response.errormessage =
      "не указан в headers master_key или указан неправильно";
    return responseObject;
  }

  if (!body["id_vk"]) {
    responseObject.response.status = 23;
    responseObject.response.type = "error";
    responseObject.response.errormessage =
      "не указан обязательный параметр id_vk";
    return responseObject;
  }

  if (!Number(body["id_vk"]) && !(Number(body["id_vk"]) >= 0)) {
    responseObject.response.status = 24;
    responseObject.response.type = "error";
    responseObject.response.errormessage = "параметр id_vk не число";
    return responseObject;
  }

  if (!body["name_vk"]) {
    responseObject.response.status = 25;
    responseObject.response.type = "error";
    responseObject.response.errormessage =
      "не указан обязательный параметр name_vk";
    return responseObject;
  }

  if (!body["telegram_nickname"]) {
    responseObject.response.status = 26;
    responseObject.response.type = "error";
    responseObject.response.errormessage =
      "не указан обязательный параметр telegram_nickname";
    return responseObject;
  }

  if (!body["group"]) {
    responseObject.response.status = 27;
    responseObject.response.type = "error";
    responseObject.response.errormessage =
      "не указан обязательный параметр group";
    return responseObject;
  }

  if (
    body["description"] &&
    (String(body["description"]).length < 1 ||
      String(body["description"]).length > 40)
  ) {
    responseObject.response.status = 30;
    responseObject.response.type = "error";
    responseObject.response.errormessage = "description некорректного типа";
    return responseObject;
  }

  if (
    body["display_name"] &&
    (String(body["display_name"]).length < 1 ||
      String(body["display_name"]).length > 40)
  ) {
    responseObject.response.status = 31;
    responseObject.response.type = "error";
    responseObject.response.errormessage = "display_name некорректного типа";
    return responseObject;
  }

  if (body["photo_url"] && !RegExp.test(body["photo_url"])) {
    responseObject.response.status = 32;
    responseObject.response.type = "error";
    responseObject.response.errormessage = "photo_url некорректного типа";
    return responseObject;
  }

  try {
    const data: userType = {
      id: Number(body["id_vk"]),
      telegram_nickname: body["telegram_nickname"],
      display_name: body["display_name"] || body["name_vk"],
      description: body["description"] || null,
      photo_url: body["photo_url"] || null,
      group: body["group"],
    };
    await firebase.setdoc("users", body["id_vk"], data);
    const metaCount = await firebase.getCount("meta");
    const meta = await firebase.get("meta", String(metaCount));
    meta?.users.push(body["id_vk"]);
    await firebase.setdoc("meta", String(metaCount + 1), meta);
    const end = new Date();
    responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
    return responseObject;
  } catch (err) {
    responseObject.response.status = 16;
    responseObject.response.type = "error";
    responseObject.response.errormessage = "ошибка firebase";
    responseObject.response.data = err;
    return responseObject;
  }
}
