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
exports.updateKontrakStatus = exports.getKontrakDetail = exports.getItemWajibRetribusiKontrak = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getItemWajibRetribusiKontrak = (wr_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.kontrak.findMany({
            where: {
                wajib_retribusi_id: wr_id,
            },
            select: {
                id: true,
                status: true,
                item_retribusi: {
                    select: {
                        id: true,
                        kategori_nama: true,
                        harga: true,
                        jenis_tagihan: true,
                        created_at: false,
                        updated_at: false,
                        retribusi: {
                            select: {
                                kedinasan: {
                                    select: {
                                        nama: true,
                                    },
                                },
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        tagihan: true,
                    },
                },
            },
        });
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getItemWajibRetribusiKontrak = getItemWajibRetribusiKontrak;
const getKontrakDetail = (kontrak_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.kontrak.findUnique({
            where: {
                id: kontrak_id,
            },
            select: {
                id: true,
                status: true,
                item_retribusi: {
                    select: {
                        id: true,
                        kategori_nama: true,
                        harga: true,
                        jenis_tagihan: true,
                        created_at: false,
                        updated_at: false,
                        retribusi: {
                            select: {
                                kedinasan: {
                                    select: {
                                        nama: true,
                                    },
                                },
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        tagihan: true,
                    },
                },
            },
        });
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getKontrakDetail = getKontrakDetail;
const updateKontrakStatus = (kontrak_id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const data = prisma.kontrak.update({
        where: {
            id: kontrak_id,
        },
        data: {
            status: status,
        },
        select: {
            id: true,
            status: true,
            item_retribusi: {
                select: {
                    id: true,
                    kategori_nama: true,
                    harga: true,
                    jenis_tagihan: true,
                    created_at: false,
                    updated_at: false,
                    retribusi: {
                        select: {
                            kedinasan: {
                                select: {
                                    nama: true,
                                },
                            },
                        },
                    },
                },
            },
            _count: {
                select: {
                    tagihan: true,
                },
            },
        },
    });
    return data;
});
exports.updateKontrakStatus = updateKontrakStatus;
