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
exports.paymentNotification = exports.getVirtualAccount = exports.getToken = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
function formatISO8601(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}
const formatResponseToISO8601 = (inputString) => {
    const year = inputString.slice(0, 4);
    const month = inputString.slice(4, 6);
    const day = inputString.slice(6, 8);
    const hours = inputString.slice(8, 10);
    const minutes = inputString.slice(10, 12);
    const seconds = inputString.slice(12, 14);
    const isoDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    const isoDateTime = new Date(isoDateString).toISOString();
    return isoDateTime;
};
function getFormattedUTCISO8601Timestamp() {
    const now = new Date();
    return formatISO8601(now);
}
function adjustTimestampForWIB(timestamp) {
    const originalDate = new Date(timestamp);
    const adjustedDate = new Date(originalDate.getTime() - 7 * 60 * 60 * 1000);
    return formatISO8601(adjustedDate);
}
const formattedUtcTimestamp = getFormattedUTCISO8601Timestamp();
const formattedWibTimestamp = adjustTimestampForWIB(formattedUtcTimestamp);
function generateDigest(jsonBody) {
    const jsonStringHash256 = crypto_1.default.createHash('sha256').update(jsonBody).digest();
    const bufferFromJsonStringHash256 = Buffer.from(jsonStringHash256);
    return bufferFromJsonStringHash256.toString('base64');
}
function generateSignature(clientId, requestId, requestTimestamp, requestTarget, digest, secret) {
    console.log('----- Component Signature -----');
    let componentSignature = 'Client-Id:' + clientId;
    componentSignature += '\n';
    componentSignature += 'Request-Id:' + requestId;
    componentSignature += '\n';
    componentSignature += 'Request-Timestamp:' + requestTimestamp;
    componentSignature += '\n';
    componentSignature += 'Request-Target:' + requestTarget;
    // If body not send when access API with HTTP method GET/DELETE
    if (digest) {
        componentSignature += '\n';
        componentSignature += 'Digest:' + digest;
    }
    // return secret;
    const hmac256Value = crypto_1.default.createHmac('sha256', secret).update(componentSignature.toString()).digest();
    // return hmac256Value;
    const bufferFromHmac256Value = Buffer.from(hmac256Value);
    // return;
    const signature = bufferFromHmac256Value.toString('base64');
    return 'HMACSHA256=' + signature;
}
const generateXSignature = (secretKey, stringToSign) => {
    const signer = crypto_1.default.createSign('sha256');
    signer.update(stringToSign);
    signer.end();
    const signature = signer.sign(secretKey, 'base64');
    return signature;
    // let bufferFromJsonStringSign = Buffer.from(jsonStringSign);
    // return bufferFromJsonStringSign.toString('base64');
};
const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiUrl = process.env.DOKU_VA_BASE_URL;
        const clientId = process.env.DOKU_CLIENT_ID;
        const secretKey = process.env.DOKU_SECRET_KEY;
        const signature = generateXSignature(secretKey, `${clientId}|${formattedWibTimestamp}`);
        const requestTarget = '/authorization/v1/access-token/b2b';
        const body = {
            grantType: 'BRN-0251-1709171991384',
            additionalInfo: '',
        };
        const headers = {
            'X-SIGNATURE': signature,
            'X-TIMESTAMP': formattedWibTimestamp,
            'X-CLIENT-KEY': process.env.DOKU_SECRET_KEY,
        };
        const data = yield axios_1.default.post(apiUrl + requestTarget, body, { headers });
        if (data.status != 200) {
            throw data;
        }
        return data.data;
    }
    catch (error) {
        console.log({ error: error });
        throw error.response;
    }
});
exports.getToken = getToken;
const getVirtualAccount = (request_id, req, bank) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiUrl = process.env.DOKU_VA_BASE_URL;
        const clientId = process.env.DOKU_CLIENT_ID;
        const requestId = request_id;
        const requestTimestamp = formattedUtcTimestamp;
        const requestTarget = '/' + bank + '-virtual-account/v2/payment-code';
        const secret = process.env.DOKU_SECRET_KEY;
        const body = req;
        const digest = generateDigest(JSON.stringify(body));
        const headers = {
            'Content-Type': 'application/json',
            'Client-Id': clientId,
            'Request-Id': requestId,
            'Request-Timestamp': requestTimestamp,
            Signature: generateSignature(clientId, requestId, requestTimestamp, requestTarget, digest, secret),
        };
        const data = yield axios_1.default.post(apiUrl + requestTarget, body, { headers });
        if (data.status != 200) {
            throw data;
        }
        const storeData = yield prisma.pembayaran.create({
            data: {
                tagihan_id: 1,
                petugas_id: 1,
                metode_pembayaran: 'VA',
                status: 'WAITING',
                virtual_account: {
                    create: [
                        {
                            tagihan_invoice: data.data.order.invoice_number,
                            virtual_account_number: data.data.virtual_account_info.virtual_account_number,
                            how_to_pay_page: data.data.virtual_account_info.how_to_pay_page,
                            how_to_pay_api: data.data.virtual_account_info.how_to_pay_api,
                            created_date: formatResponseToISO8601(data.data.virtual_account_info.created_date),
                            expired_date: formatResponseToISO8601(data.data.virtual_account_info.expired_date),
                            created_date_utc: data.data.virtual_account_info.created_date_utc,
                            expired_date_utc: data.data.virtual_account_info.expired_date_utc,
                            status: 'WAITING',
                        },
                    ],
                },
            },
            include: {
                tagihan: true,
                virtual_account: {
                    take: 1,
                },
            },
        });
        const response = {
            bank: storeData.virtual_account[0].bank,
            virtual_account_number: storeData.virtual_account[0].virtual_account_number,
            created_date: storeData.virtual_account[0].created_date,
            expired_date: storeData.virtual_account[0].expired_date,
            harga: storeData.tagihan.total_harga,
            how_to_pay_page: storeData.virtual_account[0].how_to_pay_page,
            how_to_pay_api: storeData.virtual_account[0].how_to_pay_api,
        };
        return response;
    }
    catch (error) {
        console.log({ error: error.response });
        throw error.response.data.error.message;
    }
});
exports.getVirtualAccount = getVirtualAccount;
const paymentNotification = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const notificationHeader = req.headers;
        // const notificationBody = req.body;
        // const notificationPath = '/api/payments/notifications';
        // const dokuKey = process.env.DOKU_SECRET_KEY;
        // const finalDigest = generateDigest(JSON.stringify(notificationBody));
        // const finalSignature = generateSignature(
        //   notificationHeader['client-id'],
        //   notificationHeader['request-id'],
        //   notificationHeader['request-timestamp'],
        //   notificationPath,
        //   finalDigest,
        //   dokuKey,
        // );
        const vaData = yield prisma.virtualAccount.updateMany({
            where: {
                virtual_account_number: req.body.virtual_account_info.virtual_account_number,
            },
            data: {
                status: req.body.transaction.status,
            },
        });
        const tagihan = yield prisma.tagihan.update({
            where: {
                invoice_id: req.body.order.invoice_number,
            },
            data: {
                status: 'VERIFIED',
            },
        });
        return { status: 'OK', data: vaData };
    }
    catch (error) {
        console.log({ error: error });
        throw error.response.data.error.message;
    }
});
exports.paymentNotification = paymentNotification;
