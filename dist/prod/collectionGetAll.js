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
 * возвращает все документы из коллекции
 * @param firebase класс firebase
 * @param collectionname название коллекции
 * @returns объект responseType
 */
function collectionGetAll(firebase, collectionname) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Коды ошибок
         * 3 - firebase возвращает пустой массив
         */
        const responseObject = {
            response: {
                status: 200,
                time: 0,
                type: 'array',
                data: null,
                count: 0,
            },
        };
        const start = new Date();
        responseObject.response.data = (yield firebase.getAll(collectionname)).map((el) => el.data);
        responseObject.response.count = responseObject.response.data.length;
        if (!responseObject.response.data) {
            delete responseObject.response.data;
            delete responseObject.response.count;
            responseObject.response.status = 3;
            responseObject.response.type = 'error';
            responseObject.response.errormessage = 'firebase возвращает пустой массив';
        }
        const end = new Date();
        responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
        return responseObject;
    });
}
exports.default = collectionGetAll;
