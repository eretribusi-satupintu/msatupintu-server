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
const kontrakController_1 = require("../controllers/kontrakController");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.get("/wajib-retribusi/:wr_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, kontrakController_1.getItemWajibRetribusiKontrak)(Number(req.params.wr_id));
        if (res.statusCode !== 200) {
            res.status(500).json({ message: "Internal Server Error" });
        }
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
}));
router.get("/:kontrak_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, kontrakController_1.getKontrakDetail)(Number(req.params.kontrak_id));
        if (res.statusCode !== 200) {
            res.status(500).json({ message: "Internal Server Error" });
        }
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
}));
router.put("/:kontrak_id/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, kontrakController_1.updateKontrakStatus)(Number(req.params.kontrak_id), req.body.status);
        if (res.statusCode !== 200) {
            res.status(500).json({ message: "Internal Server Error" });
        }
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
