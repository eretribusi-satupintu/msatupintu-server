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
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.get('/:phone_number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, userController_1.checkPhoneNumberIfExist)(req.params.phone_number);
        res.status(200).json({ data: data });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
router.post('/:phone_number/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.phone_number);
        const data = yield (0, userController_1.updateForgotPassword)(req.params.phone_number, req.body.new_password, req.body.confirmation_password);
        res.status(200).json({ data: data });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
exports.default = router;
