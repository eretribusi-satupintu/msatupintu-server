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
const itemRetribusiController_1 = require("../controllers/itemRetribusiController");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.get('/:subwilayah_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, itemRetribusiController_1.getItemRetribusi)(Number(req.params.subwilayah_id));
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error });
    }
}));
// router.post('/get', async (res: Response) => {
//   // res.status(200).json({ message: "success" });
//   try {
//     const data = await getWajibRetribusi();
//     res.status(200).json({ data: data });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: error });
//   }
// });
router.post('/store', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, itemRetribusiController_1.createItemRetribusi)(req.body);
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error });
    }
}));
exports.default = router;
