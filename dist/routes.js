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
const prod_1 = require("./prod");
function routes(app, firebase) {
    // GET
    app.get('/check', (req, res) => res.send('OK'));
    app.get('/docs.get', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const docsGetData = yield (0, prod_1.collectionGet)(req, firebase, 'docs');
        res.send(docsGetData);
    }));
    app.get('/exams.get', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const examsGetData = yield (0, prod_1.collectionGet)(req, firebase, 'exams');
        res.send(examsGetData);
    }));
    app.get('/teachers.get', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const teachersGetData = yield (0, prod_1.collectionGet)(req, firebase, 'teachers');
        res.send(teachersGetData);
    }));
    app.get('/tests.get', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const testsGetData = yield (0, prod_1.collectionGet)(req, firebase, 'tests');
        res.send(testsGetData);
    }));
    // отключаем, так как это сильно по сути напрягает firebase
    // app.get('/docs.getAll', async (req: Request, res: Response) => {
    //   const docsGetAllData = await collectionGetAll(firebase, 'docs');
    //   res.send(docsGetAllData);
    // });
    // app.get('/exams.getAll', async (req: Request, res: Response) => {
    //   const examsGetAllData = await collectionGetAll(firebase, 'exams');
    //   res.send(examsGetAllData);
    // });
    // app.get('/teachers.getAll', async (req: Request, res: Response) => {
    //   const teachersGetAllData = await collectionGetAll(firebase, 'teachers');
    //   res.send(teachersGetAllData);
    // });
    // app.get('/tests.getAll', async (req: Request, res: Response) => {
    //   const testsGetAllData = await collectionGetAll(firebase, 'tests');
    //   res.send(testsGetAllData);
    // });
    // POST
    app.post('/docs.post', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const buffer = yield (0, prod_1.docsPost)(req.headers, req.body, firebase);
        res.send(buffer);
    }));
    app.post('/exams.post', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const buffer = yield (0, prod_1.collectionPost)(req.headers, req.body, firebase, 'exams');
        res.send(buffer);
    }));
    app.post('/tests.post', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const buffer = yield (0, prod_1.collectionPost)(req.headers, req.body, firebase, 'tests');
        res.send(buffer);
    }));
    app.post('/users.post', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const buffer = yield (0, prod_1.usersPost)(req.headers, req.body, firebase);
        res.send(buffer);
    }));
    // DEV
    app.get('/dev', (req, res) => __awaiter(this, void 0, void 0, function* () { }));
}
exports.default = routes;
