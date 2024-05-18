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
exports.sendNotification = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const sendNotification = (title, body, token) => __awaiter(void 0, void 0, void 0, function* () {
    const message = {
        notification: {
            title: title,
            body: body,
        },
        android: {
            priority: 'high',
        },
        webpush: {
            notification: {},
        },
        token: token,
    };
    console.log(message);
    return firebaseConfig_1.messaging
        .send(message)
        .then((response) => {
        console.log('Successfully sent message:', response);
        return response;
    })
        .catch((error) => {
        console.log('Error sending message:', error);
        return error;
    });
});
exports.sendNotification = sendNotification;
