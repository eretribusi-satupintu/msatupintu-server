import { PrismaClient, StatusKontrak } from "@prisma/client";

const prisma = new PrismaClient();

export const getItemWajibRetribusiKontrak = async (wr_id: number) => {
  try {
    const data = await prisma.kontrak.findMany({
      where: {
        wajib_retribusi_id: wr_id,
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

export const getKontrakDetail = async (kontrak_id: number) => {
  try {
    const data = await prisma.kontrak.findUnique({
      where: {
        id: kontrak_id,
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
    throw error;
  }
};

export const updateKontrakStatus = async (
  kontrak_id: number,
  status: StatusKontrak
) => {
  const data = prisma.kontrak.update({
    where: {
      id: kontrak_id,
    },
    data: {
      status: status,
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
};
