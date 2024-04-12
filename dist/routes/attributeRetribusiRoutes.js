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
const attributeRetribusiController_1 = require("../controllers/attributeRetribusiController");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.post("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.status(200).json({ message: "success" });
    try {
        const data = yield (0, attributeRetribusiController_1.getWajibRetribusi)(req.body);
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error });
    }
}));
router.post("/store", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, attributeRetribusiController_1.createItemRetribusi)(req.body);
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error });
    }
}));
exports.default = router;
