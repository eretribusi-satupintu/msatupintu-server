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
const tagihanManualController_1 = require("../controllers/tagihanManualController");
const router = express_1.default.Router();
router.get('/petugas/:petugas_id/subwilayah/:subwilayah_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, tagihanManualController_1.getTagihanManual)(Number(req.params.petugas_id), Number(req.params.subwilayah_id));
        res.status(200).json({ data: data });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
router.get('/petugas/:petugas_id/subwilayah/:subwilayah_id/paid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, tagihanManualController_1.getPaidTagihanManual)(Number(req.params.petugas_id), Number(req.params.subwilayah_id));
        res.status(200).json({ data: data });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
router.post('/petugas/:petugas_id/subwilayah/:subwilayah_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, tagihanManualController_1.storeTagihanManual)(Number(req.params.petugas_id), Number(req.params.subwilayah_id), req.body);
        res.status(200).json({ data: data });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
exports.default = router;
