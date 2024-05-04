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
exports.storeTagihanManual = exports.getTagihanManual = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTagihanManual = (petugas_id, subwilayah_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.tagihanManual.findMany({
            where: {
                petugas_id: petugas_id,
                sub_wilayah_id: subwilayah_id,
                is_stored: false,
            },
            select: {
                id: true,
                item_retribusi: {
                    select: {
                        kategori_nama: true,
                    },
                },
                petugas: {
                    select: {
                        users: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                subwilayah: {
                    select: {
                        nama: true,
                    },
                },
                total_harga: true,
                detail_tagihan: true,
                status: true,
                paid_at: true,
                created_at: true,
            },
            orderBy: {
                created_at: 'desc',
            },
        });
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getTagihanManual = getTagihanManual;
const storeTagihanManual = (petugas_id, subwilayah_id, tagihan_manual) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.tagihanManual.create({
            data: {
                item_retribusi_id: tagihan_manual.item_retribusi_id,
                petugas_id: petugas_id,
                sub_wilayah_id: subwilayah_id,
                detail_tagihan: tagihan_manual.detail_tagihan,
                total_harga: tagihan_manual.total_harga,
                status: 'NEW',
            },
            select: {
                id: true,
                item_retribusi: {
                    select: {
                        kategori_nama: true,
                    },
                },
                petugas: {
                    select: {
                        users: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                subwilayah: {
                    select: {
                        nama: true,
                    },
                },
                total_harga: true,
                detail_tagihan: true,
                status: true,
                paid_at: true,
                created_at: true,
            },
        });
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.storeTagihanManual = storeTagihanManual;
