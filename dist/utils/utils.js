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
exports.formatResponseToISO8601 = exports.checkPassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hash = yield bcryptjs_1.default.hash(password, salt);
        return hash;
    }
    catch (error) {
        return error;
    }
});
exports.hashPassword = hashPassword;
const checkPassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, hash);
});
exports.checkPassword = checkPassword;
const formatResponseToISO8601 = (inputString) => {
    const year = inputString.slice(0, 4);
    const month = inputString.slice(4, 6);
    const day = inputString.slice(6, 8);
    const hours = inputString.slice(8, 10);
    const minutes = inputString.slice(10, 12);
    const seconds = inputString.slice(12, 14);
    // Create a Date object using the extracted components
    const isoDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    // Convert to ISO-8601 DateTime format
    const isoDateTime = new Date(isoDateString).toISOString();
    return isoDateTime;
};
exports.formatResponseToISO8601 = formatResponseToISO8601;
