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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const utils_1 = require("../utils/utils");
const prisma = new client_1.PrismaClient();
const register = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailExist = yield checkEmail(req.email);
        if (emailExist.status) {
            console.log(emailExist.message);
            return emailExist.message;
        }
        const hashedPassword = (yield (0, utils_1.hashPassword)(req.password));
        const data = yield prisma.user.create({
            data: {
                name: req.name,
                email: req.email,
                password: hashedPassword,
            },
        });
        return { message: "user created succesfully", user: data };
    }
    catch (error) {
        throw error;
    }
});
exports.register = register;
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: req.email.toString(),
            },
            include: {
                wajib_retribusi: {
                    select: {
                        id: true,
                    },
                },
                petugas: {
                    select: {
                        id: true,
                        subwilayah_id: true,
                    },
                },
            },
        });
        if (user === null) {
            throw { message: "Akun anda tidak terdaftar" };
        }
        if (!(yield (0, utils_1.checkPassword)(req.password, user.password))) {
            throw { message: "Password anda salah" };
        }
        // const { id, password, ...userData } = user;
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            nik: user.nik,
            pin: user.pin,
            role_id: user.role_id,
        };
        const playload = user.id.toString();
        const secret = process.env.SECRET_KEY.toString();
        const expired = 60 * 60 * 1;
        const token = jsonwebtoken_1.default.sign({ playload }, secret, {
            expiresIn: expired,
        });
        if (user.wajib_retribusi !== null) {
            return {
                message: "authenticated",
                data: Object.assign(Object.assign({}, userData), { role: user.wajib_retribusi, token }),
            };
        }
        if (user.petugas !== null) {
            return {
                message: "authenticated",
                data: Object.assign(Object.assign({}, userData), { role: user.petugas, token }),
            };
        }
        throw {
            message: "Can't idenified user role ",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.login = login;
const checkEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const checkEmail = yield prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (checkEmail) {
        return {
            status: true,
            message: "email has been taken",
        };
    }
    return {
        status: false,
        message: "Email can be use",
    };
});
const logout = () => __awaiter(void 0, void 0, void 0, function* () {
    return {
        message: "Logout Successfully",
    };
});
exports.logout = logout;
