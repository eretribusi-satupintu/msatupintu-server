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
exports.getItemWajibRetribusiKontrak = exports.getSewaWajibRetribusi = exports.getRetribusiDetail = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getRetribusiDetail = (retribusi_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = prisma.retribusi.findUnique({
            where: {
                id: retribusi_id,
            },
            select: {
                id: true,
                nama: true,
                kedinasan: {
                    select: {
                        nama: true,
                        kabupaten: {
                            select: {
                                nama: true,
                            },
                        },
                    },
                },
                created_at: false,
                updated_at: false,
            },
        });
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getRetribusiDetail = getRetribusiDetail;
const getSewaWajibRetribusi = (wr_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.retribusi.findMany({
            where: {
                item_retribusi: {
                    some: {
                        kontrak: {
                            some: {
                                wajib_retribusi_id: wr_id,
                            },
                        },
                    },
                },
            },
            include: {
                kedinasan: true,
                item_retribusi: {
                    where: {
                        kontrak: {
                            some: {
                                wajib_retribusi_id: wr_id,
                            },
                        },
                    },
                    include: {
                        kontrak: {
                            include: {
                                _count: {
                                    select: {
                                        tagihan: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        const responseData = [];
        data.map((item) => {
            const formatData = {
                id: item.id,
                nama_retribusi: item.nama,
                nama_kedinasan: item.kedinasan.nama,
                jumlah_item_retribusi: item.item_retribusi.length,
            };
            responseData.push(formatData);
        });
        return responseData;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getSewaWajibRetribusi = getSewaWajibRetribusi;
const getItemWajibRetribusiKontrak = (wr_id, retribusi_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.kontrak.findMany({
            where: {
                wajib_retribusi_id: wr_id,
                item_retribusi: {
                    retribusi_id: retribusi_id,
                },
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
