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
const authenticationController_1 = require("../controllers/authenticationController");
const firebase_messaging_1 = require("../utils/firebase_messaging");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
// router.post('/register', async (req: Request, res: Response) => {
//   try {
//     const data = await register(req.body);
//     res.status(200).json({ data: data });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       message: err,
//     });
//   }
// });
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, authenticationController_1.login)(req.body);
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(403).json(error);
    }
}));
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, authenticationController_1.logout)();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(403).json(error);
    }
}));
router.post('/notification', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firebase_messaging_1.sendNotification)('Pembayaran berhasil', 'Pembayaran untuk tagihan tagihan 1 telah berhasil dilakukan', req.body.token);
        res.status(403).json({ success: 'success' });
    }
    catch (error) {
        res.status(403).json(error);
    }
}));
exports.default = router;
