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
const stocktests_1 = require("../docs/stocktests");
const teachers_1 = require("../docs/teachers");
const vk_1 = __importDefault(require("../utils/vk"));
const testuncertainty_1 = require("./testuncertainty");
function test(firebase) {
    return __awaiter(this, void 0, void 0, function* () {
        const sueta = new vk_1.default();
        const final = [];
        const start = new Date();
        for (let i = 0; i < stocktests_1.stocktests.length; i++) {
            const content = yield sueta.get('board.getComments', [
                'group_id=169708790',
                `topic_id=${stocktests_1.stocktests[i].id}`,
                'need_likes=1',
                'count=100',
            ]);
            for (let j = 0; j < content.response.items.length; j++) {
                if (content.response.items[j].from_id > 0) {
                    final.push({
                        id: content.response.items[j].id,
                        year: 0,
                        author_id: content.response.items[j].from_id,
                        id_topic: stocktests_1.stocktests[i].id,
                        course: stocktests_1.stocktests[i].course,
                        subject: stocktests_1.stocktests[i].subject,
                        semestr: 0,
                        teacher: '',
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
                    let teacherbuffer = '';
                    for (let h = 0; h < teachers_1.teacherslist.length; h++) {
                        if (content.response.items[j].text.toLowerCase().includes(teachers_1.teacherslist[h].toLowerCase())) {
                            teacherbuffer = teachers_1.teacherslist[h];
                        }
                    }
                    for (let h = 0; h < testuncertainty_1.testuncertainty.length; h++) {
                        if (content.response.items[j].id === testuncertainty_1.testuncertainty[h].id) {
                            teacherbuffer = testuncertainty_1.testuncertainty[h].text;
                        }
                    }
                    if (teacherbuffer) {
                        final[final.length - 1].teacher = teacherbuffer;
                    }
                    else {
                        final[final.length - 1].teacher = 'Неизвестный';
                    }
                }
            }
            yield new Promise((resolve) => setTimeout(resolve, 500));
        }
        for (let i = 0; i < final.length; i++) {
            yield firebase.set('tests', final[i]);
            console.log(i);
        }
        const end = new Date();
        console.log((end.getTime() - start.getTime()) / 1000 + ' секунд');
        return final;
    });
}
exports.default = test;
