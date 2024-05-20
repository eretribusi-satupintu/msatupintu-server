import { PrismaClient } from '@prisma/client';
import { IUpdateUser } from '../types';
import { converBase64ToImage } from 'convert-base64-to-image';
import { checkPassword, hashPassword } from '../utils/utils';

const prisma = new PrismaClient();

export const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
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
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (user_id: number, req: IUpdateUser) => {
  try {
    var pathToSaveImage;
    if (req.photo_profile !== '') {
      const base64 = 'data:image/png;base64,' + req.photo_profile;
      const date_time = new Date(Date.now()).toISOString();
      pathToSaveImage = 'public/user_profile/' + date_time + '-image.png';
      converBase64ToImage(base64, pathToSaveImage);
    }

    const user = await prisma.user.update({
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
        data: { ...userData, roles: user.wajib_retribusi },
      };
    }

    if (user.petugas !== null) {
      return {
        message: 'success',
        data: { ...userData, roles: user.petugas },
      };
    }

    throw {
      message: "Can't idenified user role ",
    };

    // return user;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (email: string, old_password: string, new_password: string, confirmation_password: string) => {
  try {
    const current_password = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        password: true,
      },
    });

    if ((await checkPassword(old_password, current_password!.password)) == false) {
      throw 'Password lama anda tidak sesuai';
    }

    if (new_password != confirmation_password) {
      throw 'Password yang anda masukkan tidak sesuai';
    } else {
      const hashedPassword: string = await hashPassword(new_password);

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
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkPhoneNumberIfExist = async (phone_number: string) => {
  try {
    const user = await prisma.user.findFirst({
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
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateForgotPassword = async (phone_number: string, new_password: string, confirmation_password: string) => {
  try {
    if (new_password != confirmation_password) {
      console.log(new_password + ' ' + confirmation_password);
      throw 'Password yang anda masukkan tidak sesuai';
    } else {
      const hashedPassword: string = await hashPassword(new_password);

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
  } catch (error) {
    console.log(error);
    throw error;
  }
};
