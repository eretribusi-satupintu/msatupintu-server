import { LokasiSetoran } from '@prisma/client';
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
  disetor?: boolean;
  status?: string;
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

export enum ITagihanStatus {
  NEW,
  WAITING,
  VERIFIED,
  CANCEL,
}

// export interface IVirtualAccountCredentials {

// }
