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
exports.uploadImageTagihanManual = exports.storeTagihanManual = exports.getPaidTagihanManual = exports.getTagihanManual = void 0;
const client_1 = require("@prisma/client");
const convert_base64_to_image_1 = require("convert-base64-to-image");
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
                metode_pembayaran: true,
                bukti_bayar: true,
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
const getPaidTagihanManual = (petugas_id, subwilayah_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.tagihanManual.findMany({
            where: {
                petugas_id: petugas_id,
                sub_wilayah_id: subwilayah_id,
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
                metode_pembayaran: true,
                bukti_bayar: true,
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
exports.getPaidTagihanManual = getPaidTagihanManual;
const storeTagihanManual = (petugas_id, subwilayah_id, tagihan_manual) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.tagihanManual.create({
            data: {
                item_retribusi_id: tagihan_manual.item_retribusi_id,
                petugas_id: petugas_id,
                sub_wilayah_id: subwilayah_id,
                detail_tagihan: tagihan_manual.detail_tagihan,
                total_harga: tagihan_manual.total_harga,
                metode_pembayaran: tagihan_manual.metode_pembayaran,
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
                bukti_bayar: true,
                metode_pembayaran: true,
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
const uploadImageTagihanManual = (tagihan_manual_id, image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const base64 = 'data:image/png;base64,' + image;
        const date_time = new Date().toISOString();
        const pathToSaveImage = 'public/assets/bukti-pembayaran-tagihan-manual/' + date_time + '-' + tagihan_manual_id + '-image.png';
        (0, convert_base64_to_image_1.converBase64ToImage)(base64, pathToSaveImage);
        console.log({ base64: base64 });
        const data = yield prisma.tagihanManual.update({
            where: {
                id: tagihan_manual_id,
            },
            data: {
                bukti_bayar: pathToSaveImage,
            },
        });
        return {
            status: 'updated',
            bukti_bayar: data.bukti_bayar,
        };
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.uploadImageTagihanManual = uploadImageTagihanManual;
