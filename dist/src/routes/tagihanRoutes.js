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
const tagihanController_1 = require("../controllers/tagihanController");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.get('/wajib_retribusi/:wr_id/newest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, tagihanController_1.getNewest)(Number(req.params.wr_id));
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: error,
        });
    }
}));
// router.get(
//   "/:wr_id/item-retribusi/:retribusi_id",
//   async (req: Request, res: Response) => {
//     try {
//       const data = await getWajibRetribusiTagihan(
//         Number(req.params.wr_id),
//         Number(req.params.retribusi_id)
//       );
//       res.status(200).json({ data: data });
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({
//         message: error,
//       });
//     }
//   }
// );
router.get('/wajib-retribusi/:wr_id/sub-wilayah/:subwilayah_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, tagihanController_1.getTagihanWajibRetribusi)(Number(req.params.wr_id), Number(req.params.subwilayah_id));
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: error,
        });
    }
}));
router.get('/wajib-retribusi/:wr_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, tagihanController_1.getTagihanWajibRetribusiMasyarakat)(Number(req.params.wr_id));
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: error,
        });
    }
}));
router.get('/wajib-retribusi/:wr_id/kontrak/:kontrak_id/progress', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, tagihanController_1.getTagihanWajibRetribusiMasyarakatProgress)(Number(req.params.wr_id), Number(req.params.kontrak_id));
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: error,
        });
    }
}));
router.get('/petugas/:petugas_id/sub-wilayah/:subwilayah_id/status/:status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, tagihanController_1.getPaidTagihanWajibRetribusi)(Number(req.params.petugas_id), Number(req.params.subwilayah_id), req.params.status);
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: error,
        });
    }
}));
router.get('/petugas/:petugas_id/sub-wilayah/:subwilayah_id/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, tagihanController_1.getAllPaidTagihanWajibRetribusi)(Number(req.params.petugas_id), Number(req.params.subwilayah_id));
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: error,
        });
    }
}));
router.get('/petugas/:petugas_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, tagihanController_1.getTagihan)(Number(req.params.petugas_id));
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: error,
        });
    }
}));
router.get('/:tagihan_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, tagihanController_1.getDetailTagihan)(Number(req.params.tagihan_id));
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: error,
        });
    }
}));
exports.default = router;
