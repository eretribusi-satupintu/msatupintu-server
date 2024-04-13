import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRetribusiDetail = async (retribusi_id: number) => {
  try {
    const data = prisma.retribusi.findUnique({
      where: {
        id: retribusi_id,
      },
      select: {
        id: true,
        nama: true,
        kedinasan: {
          select: {
            nama: true,
            kabupaten: {
              select: {
                nama: true,
              },
            },
          },
        },
        created_at: false,
        updated_at: false,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getSewaWajibRetribusi = async (wr_id: number) => {
  try {
    const data = await prisma.retribusi.findMany({
      where: {
        item_retribusi: {
          some: {
            kontrak: {
              some: {
                wajib_retribusi_id: wr_id,
              },
            },
          },
        },
      },
      include: {
        kedinasan: true,
        item_retribusi: {
          where: {
            kontrak: {
              some: {
                wajib_retribusi_id: wr_id,
              },
            },
          },
          include: {
            kontrak: {
              include: {
                _count: {
                  select: {
                    tagihan: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const responseData: Object[] = [];
    data.map((item) => {
      const formatData = {
        id: item.id,
        nama_retribusi: item.nama,
        nama_kedinasan: item.kedinasan.nama,
        jumlah_item_retribusi: item.item_retribusi.length,
      };
      responseData.push(formatData);
    });

    return responseData;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const getItemWajibRetribusiKontrak = async (wr_id: number, retribusi_id: number) => {
  try {
    const data = await prisma.kontrak.findMany({
      where: {
        wajib_retribusi_id: wr_id,
        item_retribusi: {
          retribusi_id: retribusi_id,
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

    throw error;
  }
};
