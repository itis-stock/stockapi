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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class vk {
    /**
     * иницилизируем
     */
    constructor() {
        this.url = "https://api.vk.com/method/";
    }
    /**
     * делает запрос в апи вк
     * @param method название метода
     * @param params массив параметров
     * @returns возвращает контент
     */
    get(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield axios_1.default.get(this.url + method + "?" + params.join("&") + "&v=5.131", {
                headers: {
                    Authorization: "Bearer " + process.env.VK_API_KEY,
                },
            });
            return data.data;
        });
    }
}
exports.default = vk;
