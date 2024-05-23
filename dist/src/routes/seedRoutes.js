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
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const date_fns_1 = require("date-fns");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.use(body_parser_1.default.json());
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const start = new Date(req.body.tanggal_mulai);
        const end = new Date(req.body.tanggal_selesai);
        const result = (0, date_fns_1.differenceInMonths)(end, start);
        // res.status(500).json({ message: result });
        const data = yield prisma.kontrak.create({
            data: {
                wajib_retribusi_id: req.body.wr_id,
                item_retribusi_id: req.body.item_id,
                sub_wilayah_id: req.body.sw_id,
                status: 'DIPROSES',
                tanggal_mulai: start,
                tanggal_selesai: end,
            },
            include: {
                sub_wilayah: {
                    select: {
                        retribusi: {
                            select: {
                                nama: true,
                            },
                        },
                    },
                },
                item_retribusi: {
                    select: {
                        kategori_nama: true,
                        harga: true,
                    },
                },
                wajib_retribusi: {
                    select: {
                        users: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        var date = (0, date_fns_1.parseISO)(req.body.tanggal_mulai);
        for (let index = 0; index < result; index++) {
            let newDate = date;
            yield prisma.tagihan.create({
                data: {
                    invoice_id: `INV-${data.sub_wilayah.retribusi.nama}-${data.id}-${req.body.item_id}-${index + 1}`,
                    request_id: `REQ-${data.sub_wilayah.retribusi.nama}-${data.id}-${req.body.item_id}-${index + 1}`,
                    nama: `${data.item_retribusi.kategori_nama} ${data.wajib_retribusi.users.name} ${index + 1}`,
                    active: true,
                    total_harga: data.item_retribusi.harga,
                    kontrak_id: data.id,
                    status: 'NEW',
                    jatuh_tempo: newDate,
                },
            });
            newDate = (0, date_fns_1.addDays)(date, 30);
            date = newDate;
        }
        res.status(200).json({ message: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}));
exports.default = router;
// export const generateKontrakTagihan = async (req: IkontrakTagihan) => {
//   const start = new Date(req.tanggal_mulai);
//   const end = new Date(req.tanggal_selesai);
//   return differenceInMonths(end, start);
//   try {
//     const data = prisma.kontrak.create({
//       data: {
//         wajib_retribusi_id: req.wr_id,
//         item_retribusi_id: req.item_id,
//         sub_wilayah_id: req.sw_id,
//         status: 'DIPROSES',
//         tanggal_mulai: req.tanggal_mulai,
//         tanggal_selesai: req.tanggal_selesai,
//       },
//     });
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
