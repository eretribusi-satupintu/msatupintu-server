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
exports.getDetailTagihan = exports.getTagihan = exports.getPaidTagihanWajibRetribusi = exports.getTagihanWajibRetribusiMasyarakatProgress = exports.getTagihanWajibRetribusiMasyarakat = exports.getTagihanWajibRetribusi = exports.getNewest = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getNewest = (wr_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.tagihan.findMany({
            where: {
                kontrak: {
                    wajib_retribusi_id: wr_id,
                },
                status: 'NEW',
                active: true,
            },
            select: {
                id: true,
                request_id: true,
                invoice_id: true,
                nama: true,
                jatuh_tempo: true,
                status: true,
                total_harga: true,
                payment_time: true,
                kontrak: {
                    select: {
                        wajib_retribusi: {
                            select: {
                                users: {
                                    select: {
                                        name: true,
                                        phone_number: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                        item_retribusi: {
                            select: {
                                kategori_nama: true,
                                jenis_tagihan: true,
                                retribusi: {
                                    select: {
                                        nama: true,
                                        kedinasan: {
                                            select: {
                                                nama: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            take: 3,
        });
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getNewest = getNewest;
const getTagihanWajibRetribusi = (wr_id, subwilayah_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.tagihan.findMany({
            where: {
                jatuh_tempo: {
                    lt: new Date(),
                },
                kontrak: {
                    wajib_retribusi_id: wr_id,
                    sub_wilayah_id: subwilayah_id,
                },
                status: 'NEW',
                active: true,
            },
            select: {
                id: true,
                request_id: true,
                invoice_id: true,
                nama: true,
                jatuh_tempo: true,
                status: true,
                total_harga: true,
                kontrak: {
                    select: {
                        wajib_retribusi: {
                            select: {
                                users: {
                                    select: {
                                        name: true,
                                        phone_number: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                        item_retribusi: {
                            select: {
                                kategori_nama: true,
                                jenis_tagihan: true,
                                retribusi: {
                                    select: {
                                        nama: true,
                                        kedinasan: {
                                            select: {
                                                nama: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
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
exports.getTagihanWajibRetribusi = getTagihanWajibRetribusi;
const getTagihanWajibRetribusiMasyarakat = (wr_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.tagihan.findMany({
            where: {
                jatuh_tempo: {
                    lt: new Date(),
                },
                kontrak: {
                    wajib_retribusi_id: wr_id,
                },
                status: 'NEW',
                active: true,
            },
            select: {
                id: true,
                request_id: true,
                invoice_id: true,
                nama: true,
                jatuh_tempo: true,
                status: true,
                total_harga: true,
                kontrak: {
                    select: {
                        wajib_retribusi: {
                            select: {
                                users: {
                                    select: {
                                        name: true,
                                        phone_number: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                        item_retribusi: {
                            select: {
                                kategori_nama: true,
                                jenis_tagihan: true,
                                retribusi: {
                                    select: {
                                        nama: true,
                                        kedinasan: {
                                            select: {
                                                nama: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        const active_data = yield prisma.tagihan.findFirst({
            where: {
                jatuh_tempo: {
                    gt: new Date(),
                },
                kontrak: {
                    wajib_retribusi_id: wr_id,
                },
                status: 'NEW',
                active: true,
            },
            select: {
                id: true,
                request_id: true,
                invoice_id: true,
                nama: true,
                jatuh_tempo: true,
                status: true,
                total_harga: true,
                kontrak: {
                    select: {
                        wajib_retribusi: {
                            select: {
                                users: {
                                    select: {
                                        name: true,
                                        phone_number: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                        item_retribusi: {
                            select: {
                                kategori_nama: true,
                                jenis_tagihan: true,
                                retribusi: {
                                    select: {
                                        nama: true,
                                        kedinasan: {
                                            select: {
                                                nama: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (active_data !== null) {
            const tagihan = [...data, active_data];
            return tagihan;
        }
        5;
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getTagihanWajibRetribusiMasyarakat = getTagihanWajibRetribusiMasyarakat;
const getTagihanWajibRetribusiMasyarakatProgress = (wr_id, kontrak_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.tagihan.findMany({
            where: {
                kontrak: {
                    id: kontrak_id,
                    wajib_retribusi_id: wr_id,
                },
            },
            select: {
                id: true,
                request_id: true,
                invoice_id: true,
                nama: true,
                jatuh_tempo: true,
                status: true,
                total_harga: true,
                kontrak: {
                    select: {
                        wajib_retribusi: {
                            select: {
                                users: {
                                    select: {
                                        name: true,
                                        phone_number: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                        item_retribusi: {
                            select: {
                                kategori_nama: true,
                                jenis_tagihan: true,
                                retribusi: {
                                    select: {
                                        nama: true,
                                        kedinasan: {
                                            select: {
                                                nama: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
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
exports.getTagihanWajibRetribusiMasyarakatProgress = getTagihanWajibRetribusiMasyarakatProgress;
const getPaidTagihanWajibRetribusi = (petugas_id, subwilayah_id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.tagihan.findMany({
            where: {
                status: status,
                kontrak: {
                    sub_wilayah_id: subwilayah_id,
                },
                TransaksiPetugas: {
                    petugas_id: petugas_id,
                    is_stored: false,
                },
            },
            select: {
                id: true,
                request_id: true,
                invoice_id: true,
                nama: true,
                jatuh_tempo: true,
                updated_at: true,
                status: true,
                total_harga: true,
                kontrak: {
                    select: {
                        wajib_retribusi: {
                            select: {
                                users: {
                                    select: {
                                        name: true,
                                        phone_number: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                        item_retribusi: {
                            select: {
                                kategori_nama: true,
                                jenis_tagihan: true,
                                retribusi: {
                                    select: {
                                        nama: true,
                                        kedinasan: {
                                            select: {
                                                nama: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
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
exports.getPaidTagihanWajibRetribusi = getPaidTagihanWajibRetribusi;
const getTagihan = (subwilayah_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.tagihan.findMany({
            where: {
                status: 'NEW',
                active: true,
            },
            select: {
                id: true,
                nama: true,
                jatuh_tempo: true,
                status: true,
                total_harga: true,
                kontrak: {
                    select: {
                        wajib_retribusi: {
                            select: {
                                users: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                        sub_wilayah: {
                            select: { id: true, nama: true },
                        },
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
exports.getTagihan = getTagihan;
const getDetailTagihan = (tagihan_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.tagihan.findUnique({
            where: {
                id: tagihan_id,
            },
            select: {
                id: true,
                request_id: true,
                invoice_id: true,
                nama: true,
                jatuh_tempo: true,
                status: true,
                total_harga: true,
                payment_time: true,
                kontrak: {
                    select: {
                        wajib_retribusi: {
                            select: {
                                users: {
                                    select: {
                                        name: true,
                                        phone_number: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                        item_retribusi: {
                            select: {
                                kategori_nama: true,
                                jenis_tagihan: true,
                                retribusi: {
                                    select: {
                                        nama: true,
                                        kedinasan: {
                                            select: {
                                                nama: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
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
exports.getDetailTagihan = getDetailTagihan;
