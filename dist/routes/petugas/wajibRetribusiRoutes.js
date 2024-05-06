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
const wajibRetribusiController_1 = require("../../controllers/wajibRetribusiController");
const router = express_1.default.Router();
router.get('/wilayah/:sub_wilayah_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, wajibRetribusiController_1.getWajibRetribusi)(Number(req.params.sub_wilayah_id));
        if (res.statusCode !== 200) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json({ data: data });
    }
    catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
}));
router.get('/:wr_id/sub-wilayah/:sub_wilayah_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, wajibRetribusiController_1.getWajibRetribusiDetail)(Number(req.params.wr_id), Number(req.params.sub_wilayah_id));
        if (res.statusCode !== 200) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json({ data: data });
    }
    catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
}));
router.get('/:wajib_retribusi_id/wilayah/:sub_wilayah_id/kontrak', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, wajibRetribusiController_1.getWajibRetribusiKontrak)(Number(req.params.wajib_retribusi_id), Number(req.params.sub_wilayah_id));
        if (res.statusCode !== 200) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json({ data: data });
    }
    catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
}));
exports.default = router;
