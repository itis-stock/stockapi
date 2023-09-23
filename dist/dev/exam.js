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
const vk_1 = __importDefault(require("../utils/vk"));
const stockexams_1 = require("../docs/stockexams");
function exam(firebase) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const sueta = new vk_1.default();
        const final = [];
        const start = new Date();
        for (let i = 0; i < stockexams_1.stockexams.length; i++) {
            const content = yield sueta.get('board.getComments', [
                'group_id=169708790',
                `topic_id=${stockexams_1.stockexams[i].id}`,
                'need_likes=1',
                'count=100',
            ]);
            if (!((_a = content === null || content === void 0 ? void 0 : content.response) === null || _a === void 0 ? void 0 : _a.items)) {
                console.log(stockexams_1.stockexams[i].id);
            }
            else {
                if (content.response.count > 100) {
                    console.log(content.response.count);
                }
                for (let j = 0; j < content.response.items.length; j++) {
                    if (content.response.items[j].from_id > 0) {
                        final.push({
                            id: content.response.items[j].id,
                            year: 0,
                            author_id: content.response.items[j].from_id,
                            id_topic: stockexams_1.stockexams[i].id,
                            course: stockexams_1.stockexams[i].course,
                            semestr: 0,
                            teacher: stockexams_1.stockexams[i].teacher,
                            subject: stockexams_1.stockexams[i].subject,
                            date: content.response.items[j].date,
                            text: content.response.items[j].text.replace(/\n/g, '$$$'),
                            likes: content.response.items[j].likes.count,
                            attachments: [],
                            special: content.response.items[j].from_id === 256014823 ||
                                content.response.items[j].from_id === 719164558,
                        });
                        const dat = new Date(content.response.items[j].date * 1000);
                        final[final.length - 1].year = dat.getFullYear();
                        if ((dat.getMonth() >= 0 && dat.getMonth() <= 3) || dat.getMonth() >= 10) {
                            final[final.length - 1].semestr = 1;
                        }
                        else {
                            final[final.length - 1].semestr = 2;
                        }
                        if (content.response.items[j].attachments) {
                            for (let h = 0; h < content.response.items[j].attachments.length; h++) {
                                if (content.response.items[j].attachments[h].type === 'photo') {
                                    final[final.length - 1].attachments.push({
                                        type: 'photo',
                                        photo: content.response.items[j].attachments[h].photo.sizes,
                                    });
                                }
                                else {
                                    final[final.length - 1].attachments.push({
                                        type: 'doc',
                                        doc: {
                                            title: content.response.items[j].attachments[h].doc.title,
                                            size: content.response.items[j].attachments[h].doc.size,
                                            ext: content.response.items[j].attachments[h].doc.ext,
                                            url: content.response.items[j].attachments[h].doc.url,
                                        },
                                    });
                                }
                            }
                        }
                    }
                }
            }
            yield new Promise((resolve) => setTimeout(resolve, 500));
        }
        for (let i = 0; i < final.length; i++) {
            yield firebase.set('exams', final[i]);
            console.log(i);
        }
        const end = new Date();
        // fs.writeFileSync('./src/dev/stockexam.json', JSON.stringify(final));
        console.log((end.getTime() - start.getTime()) / 1000 + ' секунд');
        return final;
    });
}
exports.default = exam;
