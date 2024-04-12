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
exports.getSubWilayah = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getSubWilayah = (petugas_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.petugasSubWilayah.findMany({
            where: {
                petugas_id: petugas_id,
            },
            select: {
                sub_wilayah: {
                    select: {
                        id: true,
                        nama: true,
                    },
                },
            },
        });
        const formatedData = [];
        data.map((subwilayah) => formatedData.push(subwilayah.sub_wilayah));
        return formatedData;
    }
    catch (error) {
        throw error;
    }
});
exports.getSubWilayah = getSubWilayah;
