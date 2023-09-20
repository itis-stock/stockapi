import { initializeApp } from "firebase/app";
import {
  Firestore,
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  DocumentData,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export default class firebase {
  private firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };
  db: Firestore;
  /**
   * ну тупо инициализация firebase
   */
  constructor() {
    const app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(app);
  }
  /**
   * получить все документы из firestore
   * @param collectionname название коллекции
   * @returns возвращает массив всех документов в виде объекта, где в каждом объекте указывается id документа и data сам контент документа
   */
  async getAll(collectionname: string) {
    const querySnapshot = await getDocs(collection(this.db, collectionname));
    const content: { id: string; data: DocumentData }[] = [];
    querySnapshot.forEach((doc) => {
      content.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return content;
  }
  /**
   * получить один документ
   * @param collectionname название коллекции
   * @param docname название документа
   * @returns возвращает контент документа, либо null, если документ пустой
   */
  async get(collectionname: string, docname: string) {
    const docRef = doc(this.db, collectionname, docname);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }
  /**
   * добавить документ со своим названием документа
   * @param collectionname название коллекции
   * @param docname название документа
   * @param data контент документа
   */
  async setdoc(collectionname: string, docname: string, data: any) {
    const docRef = doc(this.db, collectionname, docname);
    await setDoc(docRef, data);
  }
  /**
   * добавить документ в firestore с уникальным id
   * @param collectionname название коллекции
   * @param data контент, который добавляется в firestore
   * @returns возвращает id документа
   */
  async set(collectionname: string, data: any) {
    const collectionRef = collection(this.db, collectionname);
    const docRef = await addDoc(collectionRef, data);
    return docRef.id;
  }
  /**
   * обновить данные документа
   * @param collectionname название коллекции
   * @param docname название документа
   * @param data контент документа
   */
  async update(collectionname: string, docname: string, data: any) {
    const docRef = doc(this.db, collectionname, docname);
    await setDoc(docRef, data, { merge: true });
  }
  /**
   * удалить документ
   * @param collectionname название коллекции
   * @param docname название документа
   */
  async delete(collectionname: string, docname: string) {
    const docRef = doc(this.db, collectionname, docname);
    await deleteDoc(docRef);
  }
}
