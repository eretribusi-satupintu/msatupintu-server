import { PrismaClient, StatusBayar } from '@prisma/client';
import { ITagihanStatus } from '../types';

const prisma = new PrismaClient();

export const getNewest = async (wr_id: number) => {
  try {
    const data = await prisma.tagihan.findMany({
      where: {
        kontrak: {
          wajib_retribusi_id: wr_id,
        },
        status: 'NEW',
        active: true,
      },
      select: {
        id: true,
        request_id: true,
        invoice_id: true,
        nama: true,
        jatuh_tempo: true,
        status: true,
        total_harga: true,
        payment_time: true,
        kontrak: {
          select: {
            wajib_retribusi: {
              select: {
                users: {
                  select: {
                    name: true,
                    phone_number: true,
                    email: true,
                  },
                },
              },
            },
            item_retribusi: {
              select: {
                kategori_nama: true,
                jenis_tagihan: true,
                retribusi: {
                  select: {
                    nama: true,
                    kedinasan: {
                      select: {
                        nama: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getTagihanWajibRetribusi = async (wr_id: number, subwilayah_id: number) => {
  try {
    const data = await prisma.tagihan.findMany({
      where: {
        kontrak: {
          wajib_retribusi_id: wr_id,
          sub_wilayah_id: subwilayah_id,
        },
        status: 'NEW',
        active: true,
      },
      select: {
        id: true,
        request_id: true,
        invoice_id: true,
        nama: true,
        jatuh_tempo: true,
        status: true,
        total_harga: true,
        kontrak: {
          select: {
            wajib_retribusi: {
              select: {
                users: {
                  select: {
                    name: true,
                    phone_number: true,
                    email: true,
                  },
                },
              },
            },
            item_retribusi: {
              select: {
                kategori_nama: true,
                jenis_tagihan: true,
                retribusi: {
                  select: {
                    nama: true,
                    kedinasan: {
                      select: {
                        nama: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getTagihanWajibRetribusiMasyarakat = async (wr_id: number) => {
  try {
    const data = await prisma.tagihan.findMany({
      where: {
        kontrak: {
          wajib_retribusi_id: wr_id,
        },
        status: 'NEW',
        active: true,
      },
      select: {
        id: true,
        request_id: true,
        invoice_id: true,
        nama: true,
        jatuh_tempo: true,
        status: true,
        total_harga: true,
        kontrak: {
          select: {
            wajib_retribusi: {
              select: {
                users: {
                  select: {
                    name: true,
                    phone_number: true,
                    email: true,
                  },
                },
              },
            },
            item_retribusi: {
              select: {
                kategori_nama: true,
                jenis_tagihan: true,
                retribusi: {
                  select: {
                    nama: true,
                    kedinasan: {
                      select: {
                        nama: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getTagihanWajibRetribusiMasyarakatProgress = async (wr_id: number, kontrak_id: number) => {
  try {
    const data = await prisma.tagihan.findMany({
      where: {
        kontrak: {
          id: kontrak_id,
          wajib_retribusi_id: wr_id,
        },
      },
      select: {
        id: true,
        request_id: true,
        invoice_id: true,
        nama: true,
        jatuh_tempo: true,
        status: true,
        total_harga: true,
        kontrak: {
          select: {
            wajib_retribusi: {
              select: {
                users: {
                  select: {
                    name: true,
                    phone_number: true,
                    email: true,
                  },
                },
              },
            },
            item_retribusi: {
              select: {
                kategori_nama: true,
                jenis_tagihan: true,
                retribusi: {
                  select: {
                    nama: true,
                    kedinasan: {
                      select: {
                        nama: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getPaidTagihanWajibRetribusi = async (petugas_id: number, subwilayah_id: number, status: StatusBayar) => {
  try {
    const data = await prisma.tagihan.findMany({
      where: {
        kontrak: {
          sub_wilayah_id: subwilayah_id,
        },
        TransaksiPetugas: {
          petugas_id: petugas_id,
          is_stored: true,
        },
      },
      select: {
        id: true,
        request_id: true,
        invoice_id: true,
        nama: true,
        jatuh_tempo: true,
        updated_at: true,
        status: true,
        total_harga: true,
        kontrak: {
          select: {
            wajib_retribusi: {
              select: {
                users: {
                  select: {
                    name: true,
                    phone_number: true,
                    email: true,
                  },
                },
              },
            },
            item_retribusi: {
              select: {
                kategori_nama: true,
                jenis_tagihan: true,
                retribusi: {
                  select: {
                    nama: true,
                    kedinasan: {
                      select: {
                        nama: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getTagihan = async (subwilayah_id: number) => {
  try {
    const data = await prisma.tagihan.findMany({
      where: {
        status: 'NEW',
        kontrak: {
          sub_wilayah_id: subwilayah_id,
        },
      },
      select: {
        id: true,
        nama: true,
        jatuh_tempo: true,
        status: true,
        total_harga: true,
        kontrak: {
          select: {
            wajib_retribusi: {
              select: {
                users: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            sub_wilayah: {
              select: { id: true, nama: true },
            },
          },
        },
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getDetailTagihan = async (tagihan_id: number) => {
  try {
    const data = await prisma.tagihan.findUnique({
      where: {
        id: tagihan_id,
      },
      select: {
        id: true,
        request_id: true,
        invoice_id: true,
        nama: true,
        jatuh_tempo: true,
        status: true,
        total_harga: true,
        payment_time: true,
        kontrak: {
          select: {
            wajib_retribusi: {
              select: {
                users: {
                  select: {
                    name: true,
                    phone_number: true,
                    email: true,
                  },
                },
              },
            },
            item_retribusi: {
              select: {
                kategori_nama: true,
                jenis_tagihan: true,
                retribusi: {
                  select: {
                    nama: true,
                    kedinasan: {
                      select: {
                        nama: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};
