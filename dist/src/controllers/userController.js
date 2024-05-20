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
exports.updateForgotPassword = exports.checkPhoneNumberIfExist = exports.updatePassword = exports.updateUser = exports.getUser = void 0;
const client_1 = require("@prisma/client");
const convert_base64_to_image_1 = require("convert-base64-to-image");
const utils_1 = require("../utils/utils");
const prisma = new client_1.PrismaClient();
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
                role_id: true,
                roles: {
                    select: {
                        id: true,
                    },
                },
                name: true,
                email: true,
                alamat: true,
                phone_number: true,
                photo_profile: true,
                nik: true,
            },
        });
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUser = getUser;
const updateUser = (user_id, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var pathToSaveImage;
        if (req.photo_profile !== '') {
            const base64 = 'data:image/png;base64,' + req.photo_profile;
            const date_time = new Date(Date.now()).toISOString();
            pathToSaveImage = 'public/user_profile/' + date_time + '-image.png';
            (0, convert_base64_to_image_1.converBase64ToImage)(base64, pathToSaveImage);
        }
        const user = yield prisma.user.update({
            where: {
                id: user_id,
            },
            data: {
                email: req.email,
                alamat: req.alamat,
                phone_number: req.phone_number,
                photo_profile: pathToSaveImage,
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
                    },
                },
            },
        });
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            nik: user.nik,
            role_id: user.role_id,
        };
        if (user.wajib_retribusi !== null) {
            return {
                message: 'success',
                data: Object.assign(Object.assign({}, userData), { roles: user.wajib_retribusi }),
            };
        }
        if (user.petugas !== null) {
            return {
                message: 'success',
                data: Object.assign(Object.assign({}, userData), { roles: user.petugas }),
            };
        }
        throw {
            message: "Can't idenified user role ",
        };
        // return user;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUser = updateUser;
const updatePassword = (email, old_password, new_password, confirmation_password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const current_password = yield prisma.user.findFirst({
            where: {
                email: email,
            },
            select: {
                password: true,
            },
        });
        if ((yield (0, utils_1.checkPassword)(old_password, current_password.password)) == false) {
            throw 'Password lama anda tidak sesuai';
        }
        if (new_password != confirmation_password) {
            throw 'Password yang anda masukkan tidak sesuai';
        }
        else {
            const hashedPassword = yield (0, utils_1.hashPassword)(new_password);
            const updatePassword = prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    password: hashedPassword,
                },
            });
            return updatePassword;
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.updatePassword = updatePassword;
const checkPhoneNumberIfExist = (phone_number) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findFirst({
            where: {
                phone_number: '0' + phone_number,
            },
        });
        // return user;
        if (user == null) {
            return {
                is_exist: false,
            };
        }
        return {
            is_exist: true,
        };
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.checkPhoneNumberIfExist = checkPhoneNumberIfExist;
const updateForgotPassword = (phone_number, new_password, confirmation_password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (new_password != confirmation_password) {
            console.log(new_password + ' ' + confirmation_password);
            throw 'Password yang anda masukkan tidak sesuai';
        }
        else {
            const hashedPassword = yield (0, utils_1.hashPassword)(new_password);
            const updatePassword = prisma.user.update({
                where: {
                    phone_number: '0' + phone_number,
                },
                data: {
                    password: hashedPassword,
                },
            });
            return updatePassword;
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.updateForgotPassword = updateForgotPassword;
