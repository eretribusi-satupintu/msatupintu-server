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
const authenticationRoutes_1 = __importDefault(require("./authenticationRoutes"));
const itemRetribusiRoutes_1 = __importDefault(require("./itemRetribusiRoutes"));
const tagihanRoutes_1 = __importDefault(require("./tagihanRoutes"));
const dokuPaymentRoutes_1 = __importDefault(require("./dokuPaymentRoutes"));
const pembayaranRoutes_1 = __importDefault(require("./pembayaranRoutes"));
const retribusiRoutes_1 = __importDefault(require("./retribusiRoutes"));
const wajibRetribusiRoutes_1 = __importDefault(require("./petugas/wajibRetribusiRoutes"));
const authValidationMiddleware_1 = __importDefault(require("../middleware/authValidationMiddleware"));
const transaksiPetugasRoutes_1 = __importDefault(require("../routes/transaksiPetugasRoutes"));
const kontrakRoutes_1 = __importDefault(require("../routes/kontrakRoutes"));
const subWilayahRoutes_1 = __importDefault(require("../routes/subWilayahRoutes"));
const setoranRoutes_1 = __importDefault(require("../routes/setoranRoutes"));
const tagihanManualRoutes_1 = __importDefault(require("../routes/tagihanManualRoutes"));
const updateForgotPasswordRoutes_1 = __importDefault(require("./updateForgotPasswordRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const seedRoutes_1 = __importDefault(require("./seedRoutes"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ server: 'SatuPintu Server is runnning' });
}));
router.use('/auth', authenticationRoutes_1.default);
router.use('/user', authValidationMiddleware_1.default, userRoutes_1.default);
router.use('/forgot-password', updateForgotPasswordRoutes_1.default);
router.use('/seed', seedRoutes_1.default);
router.use('/item-retribusi', authValidationMiddleware_1.default, itemRetribusiRoutes_1.default);
router.use('/tagihan', authValidationMiddleware_1.default, tagihanRoutes_1.default);
router.use('/tagihan-manual', authValidationMiddleware_1.default, tagihanManualRoutes_1.default);
router.use('/payment', authValidationMiddleware_1.default, dokuPaymentRoutes_1.default);
router.use('/payments', dokuPaymentRoutes_1.default);
router.use('/pembayaran', authValidationMiddleware_1.default, pembayaranRoutes_1.default);
router.use('/retribusi', authValidationMiddleware_1.default, retribusiRoutes_1.default);
router.use('/petugas', authValidationMiddleware_1.default, wajibRetribusiRoutes_1.default);
router.use('/wajib-retribusi', authValidationMiddleware_1.default, wajibRetribusiRoutes_1.default);
router.use('/transaksi-petugas', authValidationMiddleware_1.default, transaksiPetugasRoutes_1.default);
router.use('/kontrak', authValidationMiddleware_1.default, kontrakRoutes_1.default);
router.use('/setoran', authValidationMiddleware_1.default, setoranRoutes_1.default);
router.use('/sub-wilayah', authValidationMiddleware_1.default, subWilayahRoutes_1.default);
exports.default = router;
