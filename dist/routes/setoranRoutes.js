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
const setoranController_1 = require("../controllers/setoranController");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.get("/petugas/:petugas_id/subwilayah/:sub_wilayah_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, setoranController_1.getSetoran)(Number(req.params.petugas_id), Number(req.params.sub_wilayah_id));
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}));
router.post("/petugas/:petugas_id/subwilayah/:sub_wilayah_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, setoranController_1.storeSetoran)(Number(req.params.petugas_id), Number(req.params.sub_wilayah_id), req.body);
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}));
router.put("/:setoran_id/petugas/:petugas_id/subwilayah/:sub_wilayah_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, setoranController_1.updateSetoran)(Number(req.params.setoran_id), Number(req.params.petugas_id), Number(req.params.sub_wilayah_id), req.body);
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}));
exports.default = router;
