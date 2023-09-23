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
function meta(firebase) {
    return __awaiter(this, void 0, void 0, function* () {
        const start = new Date();
        const meta = {
            docs: [],
            exams: {},
            tests: {},
        };
        const docs = yield firebase.getAll('docs');
        for (let i = 0; i < docs.length; i++) {
            meta.docs.push({
                fb_id: docs[i].id,
                title: docs[i].data.title,
                teacher: docs[i].data.teacher,
                subject: docs[i].data.subject,
                semestr: docs[i].data.semestr,
                course: docs[i].data.course,
                year: docs[i].data.year,
            });
        }
        const exams = yield firebase.getAll('exams');
        for (let i = 0; i < exams.length; i++) {
            const title = exams[i].data.course +
                '-' +
                exams[i].data.semestr +
                '-' +
                exams[i].data.subject +
                '-' +
                exams[i].data.teacher;
            if (meta.exams[title]) {
                meta.exams[title].push(exams[i].id);
            }
            else {
                meta.exams[title] = [exams[i].id];
            }
        }
        const tests = yield firebase.getAll('tests');
        for (let i = 0; i < tests.length; i++) {
            const title = tests[i].data.course +
                '-' +
                tests[i].data.semestr +
                '-' +
                tests[i].data.subject +
                '-' +
                tests[i].data.teacher;
            if (meta.tests[title]) {
                meta.tests[title].push(tests[i].id);
            }
            else {
                meta.tests[title] = [tests[i].id];
            }
        }
        yield firebase.setdoc('meta', '1', meta);
        const end = new Date();
        return { time: Math.floor((end.getTime() - start.getTime()) / 1000), meta };
    });
}
exports.default = meta;
