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
const stockdocuments_1 = require("./stockdocuments");
function documents(firebase) {
    return __awaiter(this, void 0, void 0, function* () {
        const metel = [];
        const start = new Date();
        for (let i = 0; i < stockdocuments_1.stockdocuments.length; i++) {
            const dat = new Date();
            metel.push({
                url: stockdocuments_1.stockdocuments[i].url,
                id: i + 1,
                year: stockdocuments_1.stockdocuments[i].year,
                author_id: 0,
                course: stockdocuments_1.stockdocuments[i].course,
                semestr: stockdocuments_1.stockdocuments[i].semestr,
                teacher: stockdocuments_1.stockdocuments[i].teacher,
                subject: stockdocuments_1.stockdocuments[i].subject,
                date: Math.floor(dat.getTime() / 1000),
                title: stockdocuments_1.stockdocuments[i].title,
                likes: 0,
                special: stockdocuments_1.stockdocuments[i].special,
            });
        }
        for (let i = 0; i < metel.length; i++) {
            firebase.set('docs', metel[i]);
            yield new Promise((resolve) => setTimeout(resolve, 100));
        }
        const end = new Date();
        console.log(Math.floor((end.getTime() - start.getTime()) / 1000) + ' секунд');
        return metel;
    });
}
exports.default = documents;
