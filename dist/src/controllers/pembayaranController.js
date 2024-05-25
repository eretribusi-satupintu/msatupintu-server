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
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const get = (status, role_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.pembayaran.findMany({
            where: {
                status: status,
                tagihan: {
                    kontrak: {
                        wajib_retribusi_id: role_id,
                    },
                },
            },
            include: {
                tagihan: {
                    select: {
                        nama: true,
                        total_harga: true,
                        kontrak: {
                            select: {
                                item_retribusi: {
                                    select: {
                                        kategori_nama: true,
                                    },
                                },
                            },
                        },
                    },
                },
                VirtualAccount: {
                    where: {
                        status: 'SUCCESS',
                    },
                },
            },
            orderBy: {
                updated_at: 'desc',
            },
        });
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.get = get;
