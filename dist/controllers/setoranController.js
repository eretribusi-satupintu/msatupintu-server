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
exports.updateSetoran = exports.storeSetoran = exports.getSetoran = void 0;
const client_1 = require("@prisma/client");
const convert_base64_to_image_1 = require("convert-base64-to-image");
const prisma = new client_1.PrismaClient();
const getSetoran = (petugas_id, sub_wilayah_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const setoran = prisma.setoran.findMany({
            where: {
                petugas_id: petugas_id,
                sub_wilayah_id: sub_wilayah_id,
            },
            select: {
                id: true,
                total: true,
                waktu_penyetoran: true,
                bukti_penyetoran: true,
                lokasi_penyetoran: true,
                status: true,
                keterangan: true,
            },
        });
        return setoran;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getSetoran = getSetoran;
const storeSetoran = (petugas_id, sub_wilayah_id, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const base64 = 'data:image/png;base64,' + req.bukti_penyetoran;
        const date_time = new Date(req.waktu_penyetoran).toISOString();
        const pathToSaveImage = 'public/assets/' + date_time + '-image1.png';
        (0, convert_base64_to_image_1.converBase64ToImage)(base64, pathToSaveImage);
        const setoran = yield prisma.setoran.create({
            data: {
                petugas_id: petugas_id,
                sub_wilayah_id: sub_wilayah_id,
                waktu_penyetoran: date_time,
                total: req.total,
                bukti_penyetoran: pathToSaveImage,
                lokasi_penyetoran: req.lokasi_penyetoran,
                keterangan: req.keterangan,
                status: 'MENUNGGU',
            },
        });
        req.transaksi_petugas.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            const transaksiPetugas = yield prisma.transaksiPetugas.update({
                where: {
                    id: item,
                },
                data: {
                    setoran_id: setoran.id,
                    is_stored: true,
                },
            });
        }));
        return setoran;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.storeSetoran = storeSetoran;
const updateSetoran = (setoran_id, petugas_id, sub_wilayah_id, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date_time = new Date(req.waktu_penyetoran).toISOString();
        let pathToSaveImage = null;
        if (req.bukti_penyetoran !== '') {
            const base64 = 'data:image/png;base64,' + req.bukti_penyetoran;
            pathToSaveImage = 'public/assets/' + date_time + '-image1.png';
            (0, convert_base64_to_image_1.converBase64ToImage)(base64, pathToSaveImage);
        }
        const findSetoran = yield prisma.setoran.findUnique({
            where: {
                id: setoran_id,
            },
        });
        if (findSetoran == null) {
            throw 'id: ' + setoran_id;
        }
        const setoran = yield prisma.setoran.update({
            where: {
                id: setoran_id,
            },
            data: {
                petugas_id: petugas_id,
                sub_wilayah_id: sub_wilayah_id,
                waktu_penyetoran: date_time,
                total: req.total,
                bukti_penyetoran: pathToSaveImage !== null && pathToSaveImage !== void 0 ? pathToSaveImage : findSetoran.bukti_penyetoran,
                lokasi_penyetoran: req.lokasi_penyetoran,
                keterangan: req.keterangan,
                status: 'MENUNGGU',
            },
        });
        // req.transaksi_petugas.forEach(async (item) => {
        //   const transaksiPetugas = await prisma.transaksiPetugas.update({
        //     where: {
        //       id: item,
        //     },
        //     data: {
        //       setoran_id: setoran.id,
        //     },
        //   });
        // });
        return setoran;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.updateSetoran = updateSetoran;
