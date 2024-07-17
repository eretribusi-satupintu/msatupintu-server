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
exports.synchronizationLocalPayment = exports.getBillAmount = exports.petugasCancelPayTagihan = exports.petugasPayTagihan = void 0;
const client_1 = require("@prisma/client");
const tagihanController_1 = require("./tagihanController");
const convert_base64_to_image_1 = require("convert-base64-to-image");
const prisma = new client_1.PrismaClient();
const petugasPayTagihan = (transaksiPetugas) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        var bukti_bayar = '';
        if (transaksiPetugas.bukti_bayar != null && transaksiPetugas.bukti_bayar != '' && transaksiPetugas.metode_pembayaran != 'CASH') {
            const base64 = (_a = 'data:image/png;base64,' + transaksiPetugas.bukti_bayar) !== null && _a !== void 0 ? _a : '';
            const date_time = new Date().toISOString();
            const pathToSaveImage = 'public/assets/bukti-pembayaran-tagihan/' + date_time + '-' + transaksiPetugas.petugas_id + transaksiPetugas.tagihan_id + '-image.png';
            (0, convert_base64_to_image_1.converBase64ToImage)(base64, pathToSaveImage);
            bukti_bayar = pathToSaveImage;
            console.log({ base64: base64 });
        }
        const tagihan = yield prisma.tagihan.update({
            where: {
                id: transaksiPetugas.tagihan_id,
            },
            data: {
                status: 'VERIFIED',
                payment_time: new Date().toISOString(),
            },
        });
        const petugasTransaksi = yield prisma.transaksiPetugas.create({
            data: {
                petugas_id: transaksiPetugas.petugas_id,
                tagihan_id: tagihan.id,
                nominal: tagihan.total_harga,
                metode_penagihan: transaksiPetugas.metode_pembayaran,
                bukti_bayar: bukti_bayar,
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
                status: 'WAITING',
                TransaksiPetugas: {
                    update: {
                        status: 'WAITING',
                    },
                },
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
                status: 'WAITING',
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
        const totalTagihanManual = yield prisma.tagihanManual.findMany({
            where: {
                petugas_id: petugas_id,
                is_stored: false,
                sub_wilayah_id: sub_wilayah_id,
                metode_pembayaran: 'CASH',
            },
            select: {
                id: true,
                total_harga: true,
            },
        });
        const totalTagihan = yield prisma.transaksiPetugas.findMany({
            where: {
                petugas_id: petugas_id,
                is_stored: false,
                status: 'VERIFIED',
                metode_penagihan: 'CASH',
                AND: {
                    tagihan: {
                        kontrak: {
                            sub_wilayah_id: sub_wilayah_id,
                        },
                    },
                },
            },
            select: {
                id: true,
                nominal: true,
            },
        });
        let sumTagihan = 0;
        let sumTagihanManual = 0;
        totalTagihan.map((transaksi) => {
            sumTagihan += transaksi.nominal;
        });
        totalTagihanManual.map((transaksi) => {
            sumTagihanManual += transaksi.total_harga;
        });
        return { transaksi_petugas: totalTagihan, total: sumTagihan, tagihan_manual: totalTagihanManual, total_tagihan_manual: sumTagihanManual };
    }
    catch (error) {
        throw error;
    }
});
exports.getBillAmount = getBillAmount;
// const getTransaksiPetugas = as
const checkTransaksiExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const transaksiPetugas = yield prisma.transaksiPetugas.findUnique({
        where: {
            tagihan_id: id,
        },
    });
    if (transaksiPetugas) {
        return true;
    }
    else {
        return false;
    }
});
const synchronizationLocalPayment = (petugas_id, req) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        for (const tagihan_id of req.tagihan_local_id) {
            if ((yield checkTransaksiExist(tagihan_id)) == false) {
                const transaksiPetugas = {
                    petugas_id: petugas_id,
                    tagihan_id: tagihan_id,
                    metode_pembayaran: (_b = req.metode_pembayaran) !== null && _b !== void 0 ? _b : 'CASH',
                    nominal: req.amount,
                };
                yield (0, exports.petugasPayTagihan)(transaksiPetugas);
            }
        }
        // const transaksiPetugas = await prisma.transaksiPetugas.findMany();
        return { status: 'success' };
    }
    catch (error) {
        throw error;
    }
});
exports.synchronizationLocalPayment = synchronizationLocalPayment;
