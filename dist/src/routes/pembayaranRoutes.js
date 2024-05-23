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
const pembayaranController_1 = require("../controllers/pembayaranController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/:status/wajib-retribusi/:role_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, pembayaranController_1.get)(req.params.status, Number(req.params.role_id));
        if (res.statusCode !== 200) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
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
