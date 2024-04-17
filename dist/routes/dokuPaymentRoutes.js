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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dokuPaymentsControllerts_1 = require("../controllers/dokuPaymentsControllerts");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.post('/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // res.status(200).json({ data: req.body.payment_order });
        const data = yield (0, dokuPaymentsControllerts_1.getToken)();
        console.log({ routes: data });
        res.status(200).json({ data: data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
}));
router.post('/virtual-account', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, dokuPaymentsControllerts_1.getVirtualAccount)(req.body.request_id, req.body.tagihan_id, req.body.payment_order, req.body.bank);
        console.log({ routes: data });
        res.status(200).json({ data: data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
}));
router.post('/qris-checkout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, dokuPaymentsControllerts_1.getQrisCheckoutPage)(req.body.request_id, req.body);
        console.log({ data: data.data });
        res.status(200).json({ data: data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
}));
router.post('/notifications', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, dokuPaymentsControllerts_1.paymentNotification)(req);
        res.status(200).json({ data: data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
}));
router.post('/notifications/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ status: 'OK' });
}));
exports.default = router;
