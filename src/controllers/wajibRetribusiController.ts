import { PrismaClient } from '@prisma/client';
import Kontrak from '../mongo/models/Kontrak';

const prisma = new PrismaClient();

export const getWajibRetribusi = async (petugas_id: number, sub_wilayah_id: number) => {
  try {
    const data = await prisma.wajibRetribusi.findMany({
      where: {
        kontrak: {
          some: {
            sub_wilayah: {
              id: sub_wilayah_id,
              // petugas: {
              //   some: {
              //     id: petugas_id,
              //   },
              // },
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
                    jatuh_tempo: {
                      lt: new Date(),
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const formattedData = data.map((item) => {
      let jumlahTagihan = 0;
      item.kontrak.map((kontrak) => {
        jumlahTagihan += kontrak._count.tagihan;
      });
      return {
        id: item.id,
        name: item.users.name,
        nik: item.users.nik,
        no_telepon: item.users.phone_number,
        photo_profile: item.users.phone_number,
        jumlah_tagihan: jumlahTagihan,
      };
    });

    return formattedData;
  } catch (error) {
    throw error;
  }
};

export const getWajibRetribusiDetail = async (wr_id: number, sub_wilayah_id: number) => {
  try {
    const data = await prisma.wajibRetribusi.findUnique({
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
                    jatuh_tempo: {
                      lt: new Date(),
                    },
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

    let jumlah_tagihan = 0;

    data?.kontrak.map((tagihan) => {
      jumlah_tagihan += tagihan._count.tagihan;
    });

    const formattedData = {
      id: data!.id,
      name: data!.users.name,
      nik: data!.users.nik,
      no_telepon: data!.users.phone_number,
      photo_profile: data!.users.phone_number,
      jumlah_tagihan: jumlah_tagihan,
    };

    return formattedData;
  } catch (error) {
    throw error;
  }
};

export const getWajibRetribusiKontrak = async (wajib_retribusi_id: number, sub_wilayah_id: number) => {
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
  } catch (error) {
    console.log(error);
    return error;
  }
};
