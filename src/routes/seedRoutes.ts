import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import { addDays, differenceInMonths, parseISO } from 'date-fns';
import express, { Request, Response } from 'express';
import Kontrak from '../mongo/models/Kontrak';

const router = express.Router();
const prisma = new PrismaClient();
router.use(bodyParser.json());

interface IkontrakTagihan {
  wr_id: number;
  item_id: number;
  sw_id: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
}

router.get('/', async (req: Request, res: Response) => {
  try {
    const start = new Date(req.body.tanggal_mulai);
    const end = new Date(req.body.tanggal_selesai);
    const result = differenceInMonths(end, start);
    // res.status(500).json({ message: result });
    const data = await prisma.kontrak.create({
      data: {
        wajib_retribusi_id: req.body.wr_id,
        item_retribusi_id: req.body.item_id,
        sub_wilayah_id: req.body.sw_id,
        status: 'DIPROSES',
        tanggal_mulai: start,
        tanggal_selesai: end,
      },
      include: {
        sub_wilayah: {
          select: {
            retribusi: {
              select: {
                nama: true,
              },
            },
          },
        },
        item_retribusi: {
          select: {
            kategori_nama: true,
            harga: true,
          },
        },
        wajib_retribusi: {
          select: {
            users: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    var date = parseISO(req.body.tanggal_mulai);
    for (let index = 0; index < result; index++) {
      let newDate = date;
      await prisma.tagihan.create({
        data: {
          invoice_id: `INV-${data.sub_wilayah.retribusi.nama}-${data.id}-${req.body.item_id}-${index + 1}`,
          request_id: `REQ-${data.sub_wilayah.retribusi.nama}-${data.id}-${req.body.item_id}-${index + 1}`,
          nama: `${data.item_retribusi.kategori_nama} ${data.wajib_retribusi.users.name} ${index + 1}`,
          active: true,
          total_harga: data.item_retribusi.harga,
          kontrak_id: data.id,
          status: 'NEW',
          jatuh_tempo: newDate,
        },
      });
      newDate = addDays(date, 30);
      date = newDate;
    }

    res.status(200).json({ message: data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
});

export default router;
// export const generateKontrakTagihan = async (req: IkontrakTagihan) => {
//   const start = new Date(req.tanggal_mulai);
//   const end = new Date(req.tanggal_selesai);
//   return differenceInMonths(end, start);

//   try {
//     const data = prisma.kontrak.create({
//       data: {
//         wajib_retribusi_id: req.wr_id,
//         item_retribusi_id: req.item_id,
//         sub_wilayah_id: req.sw_id,
//         status: 'DIPROSES',
//         tanggal_mulai: req.tanggal_mulai,
//         tanggal_selesai: req.tanggal_selesai,
//       },
//     });

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
