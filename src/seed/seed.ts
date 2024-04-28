// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// const main = async () => {
//   const password =
//     "$2a$10$b.PDBbehW6sQghPVaQZYdOdDKIoxMMk5O2P8knrIG2tp5pnky3Eei";

//   const kabupaten_data = [
//     {
//       nama: "Samosir",
//       kedinasan: {
//         create: {
//           nama: "Dinas Lingkungan Hidup",
//         },
//       },
//     },
//   ];

//   const sub_wilayah_data = [
//     {
//       nama: "Simanindo",
//     },
//   ];
//   // {
//   //   nama: "Toba",
//   //   kedinasan: {
//   //     create: {
//   //       nama: "Dinas Perhubungan",
//   //       sub_wilayah: {
//   //         create: [
//   //           {
//   //             nama: "Laguboti",
//   //           },
//   //           {
//   //             nama: "Porsea",
//   //           },
//   //         ],
//   //       },
//   //       retribusi: {
//   //         create: [
//   //           {
//   //             nama: "Pasar",
//   //             item_retribusi: {
//   //               create: {
//   //                 kategori_nama: "Pasar Balige-Kios1-L001",
//   //                 jenis_tagihan: "MINGGUAN",
//   //                 harga: 15000,
//   //               },
//   //             },
//   //           },
//   //         ],
//   //       },
//   //     },
//   //   },
//   // },

//   const wajib_retribusi_data = [
//     {
//       name: "user1",
//       email: "user1@gmail.com",
//       password: password,
//       pin: 123123,
//       wajib_retribusi: {
//         create: {
//           nik: "12345312312",
//         },
//       },
//     },
//     {
//       name: "user2",
//       email: "user2@gmail.com",
//       password: password,
//       pin: 123123,
//       wajib_retribusi: {
//         create: {
//           nik: "1231234533123",
//         },
//       },
//     },
//     {
//       name: "user3",
//       email: "user3@gmail.com",
//       password: password,
//       pin: 123123,
//       wajib_retribusi: {
//         create: {
//           nik: "234563121233",
//         },
//       },
//     },
//   ];

//   const petugas_data = [
//     {
//       name: "petugas",
//       email: "petugas@gmail.com",
//       password: password,
//       petugas: {
//         create: {},
//       },
//     },
//     {
//       name: "petugas2",
//       email: "petugas2@gmail.com",
//       password: password,
//       petugas: {
//         create: {},
//       },
//     },
//     {
//       name: "petugas3",
//       email: "petugas3@gmail.com",
//       password: password,
//       petugas: {
//         create: {},
//       },
//     },
//   ];

//   console.log({ data: wajib_retribusi_data });

//   try {
//     for (let i = 0; i < wajib_retribusi_data.length; i++) {
//       const data_wr = await prisma.user.create({
//         data: wajib_retribusi_data[i],
//       });
//     }

//     for (let i = 0; i < kabupaten_data.length; i++) {
//       const kabupaten = await prisma.kabupaten.create({
//         data: kabupaten_data[i],
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
