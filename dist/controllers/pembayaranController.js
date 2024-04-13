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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const get = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.pembayaran.findMany({
            include: {
                tagihan: {
                    select: {
                        nama: true,
                        total_harga: true,
                        kontrak: {
                            select: {
                                item_retribusi: {
                                    select: {
                                        kategori_nama: true,
                                    },
                                },
                            },
                        },
                    },
                },
                virtual_account: {
                    take: 1,
                    orderBy: { created_at: 'desc' },
                    select: {
                        bank: true,
                    },
                },
            },
        });
        const resposeData = [];
        data.map((item, i) => {
            const { virtual_account } = item, data = __rest(item, ["virtual_account"]);
            resposeData.push(Object.assign(Object.assign({}, data), { virtual_account: item.virtual_account[i] }));
        });
        return resposeData;
    }
    catch (error) {
        throw error;
    }
});
exports.get = get;
