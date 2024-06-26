import { LokasiSetoran, MetodePembayaranTagihan, StatusTagihanManual } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export interface User {
  name: string;
  email: string;
  password: string;
  pin: number;
}

export interface IItemRetribusi {
  data_khusus_retribusi: Object;
  kategori_nama: string;
  jenis_tagihan: string;
  harga: number;
}

export interface IKontrak {}

export interface IVirtualAccountInfo {
  billing_type: string;
  expired_time: number;
  reusable_status: Boolean;
  info_1?: string;
}

export interface IVirtualAccountResponse {
  id: number;
  tagihan_id: number;
  bank: string;
  virtual_account_number: string;
  created_date: string;
  expired_date: string;
  harga: number;
  how_to_pay_page: string;
  how_to_pay_api: string;
}

export interface IOrder {
  invoice_number: number;
  amount: Decimal;
}

export interface ICustomer {
  name: string;
  email: string;
}

export interface ITagihan {
  kontrak_id: number;
  nama: string;
  total_harga: Decimal;
  status: string;
  payments: {
    order: IOrder;
    virtual_account_info: IVirtualAccountInfo;
    customer: ICustomer;
  };
}

export interface ISubDistricts {}

export interface IWajibRetribusi {
  user_id: number;
  name: string;
  nik: number;
}

export interface IKontrak {
  wr_data: IWajibRetribusi;
  item_retribusi: IItemRetribusi;
  tagihan: ITagihan[];
  sub_districts: string;
}

export interface IVirtualAccountnumberRequest {
  order: IOrder;
  virtual_account_info: IVirtualAccountInfo;
  customer: ICustomer;
}

export interface IVirtualAccountNotification {
  status: string;
  date: string;
  original_request_id: string;
  virtual_account_number: string;
}

export interface ISetoran {
  transaksi_petugas: number[];
  tagihan_manual: number[];
  waktu_penyetoran: string;
  total: number;
  lokasi_penyetoran: LokasiSetoran;
  bukti_penyetoran: string;
  keterangan: string;
}

export interface ITransaksiPetugas {
  petugas_id: number;
  tagihan_id: number;
  nominal: number;
  metode_pembayaran: MetodePembayaranTagihan;
  bukti_bayar?: string;
  disetor?: boolean;
  status?: string;
}

export interface ITagihanManual {
  item_retribusi_id: number;
  detail_tagihan: string;
  total_harga: number;
  status: StatusTagihanManual;
  paid_at: string;
  metode_pembayaran: MetodePembayaranTagihan;
}

export interface ICheckoutQrisRequest {
  order: {
    amount: number;
    invoice_number: string;
  };
  payment: {
    payment_due_date: number;
  };
}

export interface IUpdateUser {
  email: string;
  alamat: string;
  phone_number: string;
  photo_profile: string;
}

export enum ITagihanStatus {
  NEW,
  WAITING,
  VERIFIED,
  CANCEL,
}

// export interface IVirtualAccountCredentials {

// }
