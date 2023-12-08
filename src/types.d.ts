

export interface Ticket {
    id: number | string;
    departureCity: string;
    destinationCity: string;
    duration: number;
    price: number;
    departureDate: string | number;
    seatNo?: string;
}

export interface User {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    phoneNumber: number;
    ticketsAmount?: number;
    email?: string;
    gender?: boolean;
    birthDate?: number;
    favouriteCity?: string;
}