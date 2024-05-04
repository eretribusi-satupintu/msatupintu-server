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
const transaksiPetugasController_1 = require("../controllers/transaksiPetugasController");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.get('/petugas/:petugas_id/sub-wilayah/:sub_wilayah_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, transaksiPetugasController_1.getBillAmount)(Number(req.params.petugas_id), Number(req.params.sub_wilayah_id));
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
}));
router.post('/pay/cash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, transaksiPetugasController_1.petugasPayTagihan)(req.body);
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
}));
router.post('/pay/cash/cancel', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, transaksiPetugasController_1.petugasCancelPayTagihan)(req.body.tagihan_id);
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
}));
router.post('/synchronization/petugas/:petugas_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, transaksiPetugasController_1.synchronizationLocalPayment)(Number(req.params.petugas_id), req.body);
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
}));
exports.default = router;
