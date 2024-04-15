import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../types';
import { hashPassword, checkPassword } from '../utils/utils';

const prisma = new PrismaClient();

const register = async (req: User) => {
  try {
    const emailExist = await checkEmail(req.email);

    if (emailExist.status) {
      console.log(emailExist.message);
      return emailExist.message;
    }

    const hashedPassword = (await hashPassword(req.password)) as string;
    const data = await prisma.user.create({
      data: {
        name: req.name,
        email: req.email,
        password: hashedPassword,
      },
    });

    return { message: 'user created succesfully', user: data };
  } catch (error) {
    throw error;
  }
};
const login = async (req: User) => {
  try {
    const user = await prisma.user.findUnique({
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
      throw { message: 'Akun anda tidak terdaftar' };
    }

    if (!(await checkPassword(req.password, user!.password))) {
      throw { message: 'Password anda salah' };
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

    const playload = user!.id.toString();
    const secret = process.env.SECRET_KEY!.toString();
    const expired = 10;
    //  60 * 60 * 1

    const token = jwt.sign({ playload }, secret, {
      expiresIn: expired,
    });

    if (user.wajib_retribusi !== null) {
      return {
        message: 'authenticated',
        data: { ...userData, role: user.wajib_retribusi, token },
      };
    }

    if (user.petugas !== null) {
      return {
        message: 'authenticated',
        data: { ...userData, role: user.petugas, token },
      };
    }

    throw {
      message: "Can't idenified user role ",
    };
  } catch (error) {
    throw error;
  }
};

const checkEmail = async (email: string) => {
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (checkEmail) {
    return {
      status: true,
      message: 'email has been taken',
    };
  }

  return {
    status: false,
    message: 'Email can be use',
  };
};

const logout = async () => {
  return {
    message: 'Logout Successfully',
  };
};
export { register, login, logout };
