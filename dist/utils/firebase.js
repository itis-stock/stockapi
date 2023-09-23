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
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
class firebase {
    /**
     * ну тупо инициализация firebase
     */
    constructor() {
        this.firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        };
        const app = (0, app_1.initializeApp)(this.firebaseConfig);
        this.db = (0, firestore_1.getFirestore)(app);
    }
    /**
     * получить все документы из firestore
     * @param collectionname название коллекции
     * @returns возвращает массив всех документов в виде объекта, где в каждом объекте указывается id документа и data сам контент документа
     */
    getAll(collectionname) {
        return __awaiter(this, void 0, void 0, function* () {
            const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(this.db, collectionname));
            const content = [];
            querySnapshot.forEach((doc) => {
                content.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            return content;
        });
    }
    /**
     * получить один документ
     * @param collectionname название коллекции
     * @param docname название документа
     * @returns возвращает контент документа, либо null, если документ пустой
     */
    get(collectionname, docname) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = (0, firestore_1.doc)(this.db, collectionname, docname);
            const docSnap = yield (0, firestore_1.getDoc)(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            }
            else {
                return null;
            }
        });
    }
    /**
     * добавить документ со своим названием документа
     * @param collectionname название коллекции
     * @param docname название документа
     * @param data контент документа
     */
    setdoc(collectionname, docname, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = (0, firestore_1.doc)(this.db, collectionname, docname);
            yield (0, firestore_1.setDoc)(docRef, data);
        });
    }
    /**
     * добавить документ в firestore с уникальным id
     * @param collectionname название коллекции
     * @param data контент, который добавляется в firestore
     * @returns возвращает id документа <string>
     */
    set(collectionname, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const collectionRef = (0, firestore_1.collection)(this.db, collectionname);
            const docRef = yield (0, firestore_1.addDoc)(collectionRef, data);
            return docRef.id;
        });
    }
    // /**
    //  * обновить данные документа
    //  * @param collectionname название коллекции
    //  * @param docname название документа
    //  * @param data контент документа
    //  */
    // async update(collectionname: string, docname: string, data: any) {
    //   const docRef = doc(this.db, collectionname, docname);
    //   await setDoc(docRef, data, { merge: true });
    // }
    /**
     * удалить документ
     * @param collectionname название коллекции
     * @param docname название документа
     */
    delete(collectionname, docname) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = (0, firestore_1.doc)(this.db, collectionname, docname);
            yield (0, firestore_1.deleteDoc)(docRef);
        });
    }
    /**
     * получить количество документов в коллекции
     * @param collectionname название коллекции
     * @returns количество документов в коллекции <number>
     */
    getCount(collectionname) {
        return __awaiter(this, void 0, void 0, function* () {
            const collectionRef = (0, firestore_1.collection)(this.db, collectionname);
            const snap = yield (0, firestore_1.getCountFromServer)(collectionRef);
            return snap.data().count;
        });
    }
}
exports.default = firebase;
