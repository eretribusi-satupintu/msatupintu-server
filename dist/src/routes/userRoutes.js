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
const userController_1 = require("../controllers/userController");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, userController_1.getUser)(req.body.email);
        res.status(200).json({ data: data });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
router.put('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = yield (0, userController_1.updateUser)(Number(req.params.user_id), req.body);
        console.log(data);
        res.status(200).json({ data: data });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002' && ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === 'users_phone_number_key') {
                console.error('Error: A user with this phone number already exists.');
                res.status(500).json({ message: 'A user with this phone number already exists.' });
            }
            else {
                res.status(500).json({ message: error.message });
            }
        }
        else {
            res.status(500).json({ message: error });
        }
        res.status(500).json({ message: error });
    }
}));
router.post('/update-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, userController_1.updatePassword)(req.body.email, req.body.old_password, req.body.new_password, req.body.confirmation_password);
        res.status(200).json({ data: data });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
exports.default = router;
