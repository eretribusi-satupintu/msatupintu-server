import { PrismaClient, StatusBayar } from '@prisma/client';
import { ITagihanStatus } from '../types';
import { now } from 'mongoose';
import Kontrak from '../mongo/models/Kontrak';

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
      take: 3,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

// export const getTagihanWajibRetribusi = async (wr_id: number, subwilayah_id: number) => {
//   try {
//     const kontrak = await prisma.kontrak.findMany({
//       where: {
//         wajib_retribusi_id: wr_id,
//         sub_wilayah_id: subwilayah_id,
//       },
//       select: {
//         id: true,
//       },
//     });

//     const tagihan_list: Object[] = [];

//     // for (const item of kontrak) {
//       const late_data = await prisma.tagihan.findMany({
//         where: {
//           kontrak_id: item.id,
//           jatuh_tempo: {
//             lt: new Date(),
//           },
//           status: 'NEW',
//           active: true,
//         },
//         select: {
//           id: true,
//           request_id: true,
//           invoice_id: true,
//           nama: true,
//           jatuh_tempo: true,
//           status: true,
//           total_harga: true,
//           kontrak: {
//             select: {
//               wajib_retribusi: {
//                 select: {
//                   users: {
//                     select: {
//                       name: true,
//                       phone_number: true,
//                       email: true,
//                     },
//                   },
//                 },
//               },
//               item_retribusi: {
//                 select: {
//                   kategori_nama: true,
//                   jenis_tagihan: true,
//                   retribusi: {
//                     select: {
//                       nama: true,
//                       kedinasan: {
//                         select: {
//                           nama: true,
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//         orderBy: {
//           jatuh_tempo: 'asc',
//         },
//       });

//       const active_data = await prisma.tagihan.findFirst({
//         where: {
//           kontrak_id: item.id,
//           jatuh_tempo: {
//             gt: new Date(),
//           },
//           status: 'NEW',
//           active: true,
//         },
//         select: {
//           id: true,
//           request_id: true,
//           invoice_id: true,
//           nama: true,
//           jatuh_tempo: true,
//           status: true,
//           total_harga: true,
//           kontrak: {
//             select: {
//               wajib_retribusi: {
//                 select: {
//                   users: {
//                     select: {
//                       name: true,
//                       phone_number: true,
//                       email: true,
//                     },
//                   },
//                 },
//               },
//               item_retribusi: {
//                 select: {
//                   kategori_nama: true,
//                   jenis_tagihan: true,
//                   retribusi: {
//                     select: {
//                       nama: true,
//                       kedinasan: {
//                         select: {
//                           nama: true,
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       });

//       const tagihan = [];

//       if (late_data.length > 0) {
//         tagihan.push(...late_data);
//       }

//       if (active_data) {
//         tagihan.push(active_data);
//       }

//       tagihan_list.push(tagihan);
//     // }

//     return tagihan_list;
//   } catch (error) {
//     throw error;
//   }
// };

export const getTagihanWajibRetribusi = async (wr_id: number, subwilayah_id: number) => {
  try {
    const kontrak = await prisma.kontrak.findMany({
      where: {
        wajib_retribusi_id: wr_id,
        sub_wilayah_id: subwilayah_id,
      },
      select: {
        id: true,
      },
    });

    var tagihan_list: Object[] = [];

    await Promise.all(
      kontrak.map(async (item) => {
        const late_data = await prisma.tagihan.findMany({
          where: {
            kontrak_id: item.id,
            jatuh_tempo: {
              lt: new Date(),
            },
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

        const active_data = await prisma.tagihan.findFirst({
          where: {
            kontrak_id: item.id,
            jatuh_tempo: {
              gt: new Date(),
            },
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

        late_data.forEach((tagihan) => tagihan_list.push(tagihan));

        if (active_data) {
          tagihan_list.push(active_data);
        }
      }),
    );

    return tagihan_list;
  } catch (error) {
    throw error;
  }
};

export const getTagihanWajibRetribusiMasyarakat = async (wr_id: number) => {
  try {
    const data = await prisma.tagihan.findMany({
      where: {
        jatuh_tempo: {
          lt: new Date(),
        },
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

    const active_data = await prisma.tagihan.findFirst({
      where: {
        jatuh_tempo: {
          gt: new Date(),
        },
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

    if (active_data !== null) {
      const tagihan = [...data, active_data];
      return tagihan;
    }

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
        status: status,
        kontrak: {
          sub_wilayah_id: subwilayah_id,
        },
        TransaksiPetugas: {
          petugas_id: petugas_id,
          is_stored: false,
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

export const getTagihan = async (petugas_id: number, subwilayah_id: number) => {
  try {
    const data = await prisma.tagihan.findMany({
      where: {
        kontrak: {
          sub_wilayah: {
            PetugasSubWilayah: {
              some: {
                petugas_id: petugas_id,
              },
            },
          },
        },
        status: 'NEW',
        active: true,
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
