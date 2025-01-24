export interface UploadPaymentVoucherInterface {
    txt_id: string;
    id_business: number;
    id_beneficiary: number;
    id_reservations: number;
    id_payments_methods_business: number;
    name_payment: string;
    voucher: string;
    code_cu: string;
    concept_transactions: string;
    price_transactions: number;
}