"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersPost = exports.collectionPost = exports.collectionGetAll = exports.collectionGet = exports.docsPost = void 0;
// POST
const docsPost_1 = __importDefault(require("./docsPost"));
exports.docsPost = docsPost_1.default;
const collectionPost_1 = __importDefault(require("./collectionPost"));
exports.collectionPost = collectionPost_1.default;
const usersPost_1 = __importDefault(require("./usersPost"));
exports.usersPost = usersPost_1.default;
// GET
const collectionGet_1 = __importDefault(require("./collectionGet"));
exports.collectionGet = collectionGet_1.default;
const collectionGetAll_1 = __importDefault(require("./collectionGetAll"));
exports.collectionGetAll = collectionGetAll_1.default;
