"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * обобщенная функция для получения одного документа из определенной коллекции
 * @param req request для получения параметров
 * @param firebase класс firebase для отправки запросов на firebase
 * @param collectionname название коллекции
 * @returns объект responseType
 */
function collectionGet(req, firebase, collectionname) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Коды ошибок для collectionGet
         * 1 - неправильный fb_id (firebase возвращает null)
         * 2 - не существует параметра fb_id
         */
        const responseObject = {
            response: {
                status: 200,
                time: 0,
                type: 'object',
                data: null,
            },
        };
        const start = new Date();
        if (req.query['fb_id']) {
            responseObject.response.data = yield firebase.get(collectionname, String(req.query['fb_id']));
            if (!responseObject.response.data) {
                responseObject.response.status = 1;
                delete responseObject.response.data;
                responseObject.response.type = 'error';
                responseObject.response.errormessage = 'неправильный fb_id (firebase возвращает null)';
            }
        }
        else {
            responseObject.response.status = 2;
            delete responseObject.response.data;
            responseObject.response.type = 'error';
            responseObject.response.errormessage = 'не существует параметра fb_id';
        }
        const end = new Date();
        responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
        return responseObject;
    });
}
exports.default = collectionGet;
