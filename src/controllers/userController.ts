import { PrismaClient } from '@prisma/client';
import { IUpdateUser } from '../types';
import { converBase64ToImage } from 'convert-base64-to-image';

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

export const updateUser = async (id: number, req: IUpdateUser) => {
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
        id: id,
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
            subwilayah_id: true,
          },
        },
      },
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      nik: user.nik,
      pin: user.pin,
      role_id: user.role_id,
    };

    if (user.wajib_retribusi !== null) {
      return {
        message: 'authenticated',
        data: { ...userData, role: user.wajib_retribusi },
      };
    }

    if (user.petugas !== null) {
      return {
        message: 'authenticated',
        data: { ...userData, role: user.petugas },
      };
    }

    throw {
      message: "Can't idenified user role ",
    };

    return user;
  } catch (error) {
    throw error;
  }
};
