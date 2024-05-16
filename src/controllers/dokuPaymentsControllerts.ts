import { PrismaClient } from '@prisma/client';

import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';

import { ICheckoutQrisRequest, IVirtualAccountResponse, IVirtualAccountnumberRequest } from '../types';
import { sendNotification } from '../utils/firebase_messaging';
const prisma = new PrismaClient();
dotenv.config();

function formatISO8601(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

const formatResponseToISO8601 = (inputString: string): string => {
  const year = inputString.slice(0, 4);
  const month = inputString.slice(4, 6);
  const day = inputString.slice(6, 8);
  const hours = inputString.slice(8, 10);
  const minutes = inputString.slice(10, 12);
  const seconds = inputString.slice(12, 14);

  const isoDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  const isoDateTime = new Date(isoDateString).toISOString();

  return isoDateTime;
};
function getFormattedUTCISO8601Timestamp(): string {
  const now = new Date();
  return formatISO8601(now);
}

function adjustTimestampForWIB(timestamp: string): string {
  const originalDate = new Date(timestamp);
  const adjustedDate = new Date(originalDate.getTime() - 7 * 60 * 60 * 1000);
  return formatISO8601(adjustedDate);
}

const formattedUtcTimestamp: string = getFormattedUTCISO8601Timestamp();

const formattedWibTimestamp: string = adjustTimestampForWIB(formattedUtcTimestamp);

function generateDigest(jsonBody: string) {
  const jsonStringHash256 = crypto.createHash('sha256').update(jsonBody).digest();

  const bufferFromJsonStringHash256 = Buffer.from(jsonStringHash256);
  return bufferFromJsonStringHash256.toString('base64');
}

function generateSignature(clientId: String, requestId: String, requestTimestamp: String, requestTarget: String, digest: String, secret: any) {
  console.log('----- Component Signature -----');
  let componentSignature = 'Client-Id:' + clientId;
  componentSignature += '\n';
  componentSignature += 'Request-Id:' + requestId;
  componentSignature += '\n';
  componentSignature += 'Request-Timestamp:' + requestTimestamp;
  componentSignature += '\n';
  componentSignature += 'Request-Target:' + requestTarget;
  // If body not send when access API with HTTP method GET/DELETE
  if (digest) {
    componentSignature += '\n';
    componentSignature += 'Digest:' + digest;
  }
  // return secret;
  const hmac256Value = crypto.createHmac('sha256', secret).update(componentSignature.toString()).digest();
  // return hmac256Value;
  const bufferFromHmac256Value = Buffer.from(hmac256Value);
  // return;
  const signature = bufferFromHmac256Value.toString('base64');

  return 'HMACSHA256=' + signature;
}

const generateXSignature = (secretKey: string, stringToSign: string) => {
  const signer = crypto.createSign('sha256');
  signer.update(stringToSign);
  signer.end();

  const signature = signer.sign(secretKey, 'base64');
  return signature;
};

const getVirtualAccount = async (
  request_id: string,
  tagihan_id: number,
  request_timestamp: string,
  req: IVirtualAccountnumberRequest,
  bank: string,
  fcm_token: string,
) => {
  try {
    const apiUrl = process.env.DOKU_VA_BASE_URL;
    const clientId = process.env.DOKU_CLIENT_ID;
    const requestId = request_id;
    const requestTimestamp = request_timestamp;
    const requestTarget = '/' + bank + '-virtual-account/v2/payment-code';
    const secret = process.env.DOKU_SECRET_KEY;
    const body = req;
    const digest = generateDigest(JSON.stringify(body));

    const headers = {
      'Content-Type': 'application/json',
      'Client-Id': clientId,
      'Request-Id': requestId,
      'Request-Timestamp': requestTimestamp,
      Signature: generateSignature(clientId!, requestId, requestTimestamp, requestTarget, digest, secret),
    };

    const data = await axios.post(apiUrl! + requestTarget, body, { headers });

    if (data.status != 200) {
      throw data;
    }

    const storeData = await prisma.pembayaran.create({
      data: {
        tagihan_id: tagihan_id,
        metode_pembayaran: 'VA',
        status: 'WAITING',
        fcm_token: fcm_token,
        VirtualAccount: {
          create: {
            tagihan_invoice: data.data.order.invoice_number,
            virtual_account_number: data.data.virtual_account_info.virtual_account_number,
            how_to_pay_page: data.data.virtual_account_info.how_to_pay_page,
            how_to_pay_api: data.data.virtual_account_info.how_to_pay_api,
            bank: bank,
            created_date: formatResponseToISO8601(data.data.virtual_account_info.created_date),
            expired_date: formatResponseToISO8601(data.data.virtual_account_info.expired_date),
            created_date_utc: data.data.virtual_account_info.created_date_utc,
            expired_date_utc: data.data.virtual_account_info.expired_date_utc,
            status: 'WAITING',
          },
        },
      },
      include: {
        tagihan: true,
        VirtualAccount: true,
      },
    });

    const response = {
      tagihan_id: tagihan_id,
      bank: storeData.VirtualAccount!.bank,
      virtual_account_number: storeData.VirtualAccount!.virtual_account_number,
      created_date: storeData.VirtualAccount!.created_date,
      expired_date: storeData.VirtualAccount!.expired_date,
      harga: storeData.tagihan.total_harga,
      how_to_pay_page: storeData.VirtualAccount!.how_to_pay_page,
      how_to_pay_api: storeData.VirtualAccount!.how_to_pay_api,
    };

    return response;
  } catch (error) {
    console.log({ error: (error as any).response.message });

    throw (error as any).response.data.error.message;
  }
};

const getQrisCheckoutPage = async (request_id: string, tagihan_id: number, request_timestamp: string, req: ICheckoutQrisRequest) => {
  try {
    console.log(request_timestamp);
    const apiUrl = process.env.DOKU_VA_BASE_URL;
    const clientId = process.env.DOKU_CLIENT_ID;
    const requestId = request_id;
    const requestTimestamp = request_timestamp;
    const requestTarget = '/checkout/v1/payment';
    const secret = process.env.DOKU_SECRET_KEY;
    const body = req;
    const digest = generateDigest(JSON.stringify(body));

    const headers = {
      'Client-Id': process.env.DOKU_CLIENT_ID,
      'Request-Id': requestId,
      'Request-Timestamp': request_timestamp,
      Signature: generateSignature(clientId!, requestId, requestTimestamp, requestTarget, digest, secret),
    };

    const res = await axios.post(apiUrl! + requestTarget, body, { headers });

    if (res.status != 200) {
      throw res.data;
    }

    const qrisCheckout = await prisma.checkoutPayment.create({
      data: {
        tagihan_id: tagihan_id,
        payment_method_types: res.data.response.payment.payment_method_types[0],
        url: res.data.response.payment.url,
        payment_due_date: res.data.response.payment.payment_due_date,
        expired_date: res.data.response.payment.expired_date,
        token_id: res.data.response.payment.token_id,
        uuid: res.data.response.uuid.toString(),
      },
    });

    return qrisCheckout;
  } catch (error) {
    console.log({ error: (error as any).response.data });
    // throw error;
    throw (error as any).response.data.error.message;
  }
};

const paymentNotification = async (req: any) => {
  try {
    const vaData = await prisma.virtualAccount.update({
      where: {
        virtual_account_number: req.body.virtual_account_info.virtual_account_number,
      },
      data: {
        status: req.body.transaction.status,
      },
    });

    const tagihan = await prisma.tagihan.update({
      where: {
        invoice_id: req.body.order.invoice_number,
      },
      data: {
        status: 'VERIFIED',
        payment_time: req.body.transaction.date,
      },
    });

    const pembayaran = await prisma.pembayaran.update({
      where: {
        id: vaData.pembayaran_id,
      },
      data: {
        status: 'SUCCESS',
      },
    });

    await prisma.virtualAccount.deleteMany({
      where: {
        pembayaran: {
          tagihan_id: req.tagihan_id,
        },
        NOT: {
          status: 'SUCCESS',
        },
      },
    });

    await sendNotification('Pembayaran berhasil', `Pembayaran untuk tagihan ${tagihan.nama} telah berhasil dilakukan`, pembayaran.fcm_token);

    return { status: 'OK', data: tagihan.id };
  } catch (error) {
    console.log({ error: error });
    throw (error as any).response.data.error.message;
  }
};

const getAllVirtualAccountPayments = async (wr_id: number, status: string) => {
  try {
    const data = await prisma.virtualAccount.findMany({
      where: {
        pembayaran: {
          tagihan: {
            kontrak: {
              wajib_retribusi_id: wr_id,
            },
          },
        },
        status: status,
      },
      include: {
        pembayaran: {
          select: {
            tagihan: {
              select: {
                id: true,
                total_harga: true,
              },
            },
          },
        },
      },
    });

    const dataList: IVirtualAccountResponse[] = [];

    data.map((va) =>
      dataList.push({
        id: va.id,
        tagihan_id: va.pembayaran.tagihan.id,
        bank: va.bank,
        virtual_account_number: va.virtual_account_number,
        created_date: va.created_date.toISOString(),
        expired_date: va.expired_date.toISOString(),
        harga: va.pembayaran.tagihan.total_harga,
        how_to_pay_page: va.how_to_pay_page,
        how_to_pay_api: va.how_to_pay_api,
      }),
    );

    return dataList;
  } catch (error) {
    console.log({ error: error });
    throw error;
  }
};

export { getVirtualAccount, paymentNotification, getQrisCheckoutPage, getAllVirtualAccountPayments };
