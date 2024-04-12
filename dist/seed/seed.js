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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const password = "$2a$10$b.PDBbehW6sQghPVaQZYdOdDKIoxMMk5O2P8knrIG2tp5pnky3Eei";
    const kabupaten_data = [
        {
            nama: "Samosir",
            kedinasan: {
                create: {
                    nama: "Dinas Lingkungan Hidup",
                },
            },
        },
    ];
    const sub_wilayah_data = [
        {
            nama: "Simanindo",
        },
    ];
    // {
    //   nama: "Toba",
    //   kedinasan: {
    //     create: {
    //       nama: "Dinas Perhubungan",
    //       sub_wilayah: {
    //         create: [
    //           {
    //             nama: "Laguboti",
    //           },
    //           {
    //             nama: "Porsea",
    //           },
    //         ],
    //       },
    //       retribusi: {
    //         create: [
    //           {
    //             nama: "Pasar",
    //             item_retribusi: {
    //               create: {
    //                 kategori_nama: "Pasar Balige-Kios1-L001",
    //                 jenis_tagihan: "MINGGUAN",
    //                 harga: 15000,
    //               },
    //             },
    //           },
    //         ],
    //       },
    //     },
    //   },
    // },
    const wajib_retribusi_data = [
        {
            name: "user1",
            email: "user1@gmail.com",
            password: password,
            pin: 123123,
            wajib_retribusi: {
                create: {
                    nik: "12345312312",
                },
            },
        },
        {
            name: "user2",
            email: "user2@gmail.com",
            password: password,
            pin: 123123,
            wajib_retribusi: {
                create: {
                    nik: "1231234533123",
                },
            },
        },
        {
            name: "user3",
            email: "user3@gmail.com",
            password: password,
            pin: 123123,
            wajib_retribusi: {
                create: {
                    nik: "234563121233",
                },
            },
        },
    ];
    const petugas_data = [
        {
            name: "petugas",
            email: "petugas@gmail.com",
            password: password,
            petugas: {
                create: {},
            },
        },
        {
            name: "petugas2",
            email: "petugas2@gmail.com",
            password: password,
            petugas: {
                create: {},
            },
        },
        {
            name: "petugas3",
            email: "petugas3@gmail.com",
            password: password,
            petugas: {
                create: {},
            },
        },
    ];
    console.log({ data: wajib_retribusi_data });
    try {
        for (let i = 0; i < wajib_retribusi_data.length; i++) {
            const data_wr = yield prisma.user.create({
                data: wajib_retribusi_data[i],
            });
        }
        for (let i = 0; i < kabupaten_data.length; i++) {
            const kabupaten = yield prisma.kabupaten.create({
                data: kabupaten_data[i],
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
