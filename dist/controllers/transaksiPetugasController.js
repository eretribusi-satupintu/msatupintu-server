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
exports.getBillAmount = exports.petugasCancelPayTagihan = exports.petugasPayTagihan = void 0;
const client_1 = require("@prisma/client");
const tagihanController_1 = require("./tagihanController");
const prisma = new client_1.PrismaClient();
const petugasPayTagihan = (transaksiPetugas) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagihan = yield prisma.tagihan.update({
            where: {
                id: transaksiPetugas.tagihan_id,
            },
            data: {
                status: 'VERIFIED',
            },
        });
        const petugasTransaksi = yield prisma.transaksiPetugas.create({
            data: {
                petugas_id: transaksiPetugas.petugas_id,
                tagihan_id: tagihan.id,
                nominal: tagihan.total_harga,
                status: 'VERIFIED',
            },
        });
        const tagihanDetail = yield (0, tagihanController_1.getDetailTagihan)(tagihan.id);
        return tagihanDetail;
    }
    catch (error) {
        throw error.message;
    }
});
exports.petugasPayTagihan = petugasPayTagihan;
const petugasCancelPayTagihan = (tagihan_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagihan = yield prisma.tagihan.update({
            where: {
                id: tagihan_id,
            },
            data: {
                status: 'REQUEST',
            },
            include: {
                TransaksiPetugas: true,
            },
        });
        const petugasTransaksi = yield prisma.transaksiPetugas.update({
            where: {
                id: tagihan.TransaksiPetugas.id,
            },
            data: {
                status: 'REQUEST',
            },
        });
        const tagihanDetail = yield (0, tagihanController_1.getDetailTagihan)(tagihan_id);
        return tagihanDetail;
    }
    catch (error) {
        throw error.message;
    }
});
exports.petugasCancelPayTagihan = petugasCancelPayTagihan;
const getBillAmount = (petugas_id, sub_wilayah_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalTagiahn = yield prisma.transaksiPetugas.findMany({
            where: {
                petugas_id: petugas_id,
                disetor: false,
                status: 'VERIFIED',
                AND: {
                    tagihan: {
                        kontrak: {
                            sub_wilayah_id: sub_wilayah_id,
                        },
                    },
                },
            },
            select: {
                nominal: true,
            },
        });
        let sumTagihan = 0;
        totalTagiahn.map((transaksi) => {
            sumTagihan += transaksi.nominal;
        });
        return { total: sumTagihan };
    }
    catch (error) {
        throw error;
    }
});
exports.getBillAmount = getBillAmount;
