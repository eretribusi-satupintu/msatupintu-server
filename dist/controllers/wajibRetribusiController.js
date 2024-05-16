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
exports.getWajibRetribusiKontrak = exports.getWajibRetribusiDetail = exports.getWajibRetribusi = void 0;
const client_1 = require("@prisma/client");
const tagihanController_1 = require("./tagihanController");
const prisma = new client_1.PrismaClient();
const getWajibRetribusi = (sub_wilayah_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.wajibRetribusi.findMany({
            where: {
                kontrak: {
                    some: {
                        sub_wilayah: {
                            id: sub_wilayah_id,
                        },
                        tagihan: {
                            some: {
                                status: 'NEW',
                                active: true,
                            },
                        },
                    },
                },
            },
            include: {
                users: {
                    select: {
                        name: true,
                        nik: true,
                        photo_profile: true,
                        phone_number: true,
                    },
                },
                kontrak: {
                    where: {
                        sub_wilayah_id: sub_wilayah_id,
                    },
                    include: {
                        _count: {
                            select: {
                                tagihan: {
                                    where: {
                                        status: 'NEW',
                                        active: true,
                                        // jatuh_tempo: {
                                        //   lt: new Date(),
                                        // },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        var wr_list = [];
        yield Promise.all(data.map((wr) => __awaiter(void 0, void 0, void 0, function* () {
            wr_list.push(yield (0, exports.getWajibRetribusiDetail)(wr.id, sub_wilayah_id));
        })));
        // const formattedData = data.map((item) => {
        //   let jumlahTagihan = 0;
        //   item.kontrak.map((kontrak) => {
        //     jumlahTagihan += kontrak._count.tagihan;
        //   });
        //   return {
        //     id: item.id,
        //     name: item.users.name,
        //     nik: item.users.nik,
        //     no_telepon: item.users.phone_number,
        //     photo_profile: item.users.phone_number,
        //     jumlah_tagihan: jumlahTagihan,
        //   };
        // });
        return wr_list;
    }
    catch (error) {
        throw error;
    }
});
exports.getWajibRetribusi = getWajibRetribusi;
const getWajibRetribusiDetail = (wr_id, sub_wilayah_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.wajibRetribusi.findUnique({
            where: {
                id: wr_id,
            },
            include: {
                users: {
                    select: {
                        name: true,
                        nik: true,
                        photo_profile: true,
                        phone_number: true,
                    },
                },
                kontrak: {
                    where: {
                        sub_wilayah_id: sub_wilayah_id,
                    },
                    include: {
                        _count: {
                            select: {
                                tagihan: {
                                    where: {
                                        status: 'NEW',
                                        active: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        let jumlah_tagihan = yield (0, tagihanController_1.getTagihanWajibRetribusi)(wr_id, sub_wilayah_id);
        // data?.kontrak.map((tagihan) => {
        //   jumlah_tagihan += tagihan._count.tagihan;
        // });
        const formattedData = {
            id: data.id,
            name: data.users.name,
            nik: data.users.nik,
            no_telepon: data.users.phone_number,
            photo_profile: data.users.phone_number,
            jumlah_tagihan: jumlah_tagihan.length,
        };
        return formattedData;
    }
    catch (error) {
        throw error;
    }
});
exports.getWajibRetribusiDetail = getWajibRetribusiDetail;
const getWajibRetribusiKontrak = (wajib_retribusi_id, sub_wilayah_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = prisma.kontrak.findMany({
            where: {
                wajib_retribusi_id: wajib_retribusi_id,
                AND: {
                    sub_wilayah_id: sub_wilayah_id,
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
        return error;
    }
});
exports.getWajibRetribusiKontrak = getWajibRetribusiKontrak;
