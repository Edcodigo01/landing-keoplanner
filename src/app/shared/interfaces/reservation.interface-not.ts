export interface ReservationInterface {
    id_reservations_delete?: number,
    email: string,
    name: string,
    paternal_lastname: string,
    id_format_phone: number,
    phone: string,
    id_employee: number,
    slug_business: string,
    slug_service: string,
    commit: string,
    mode: string,
    date_reservations: string,
    time_reservations: string,
    address_beneficiary?: {
        country?: string,
        state?: string,
        city?: string,
        zip_code?: string,
        address_street?: string
    }
}