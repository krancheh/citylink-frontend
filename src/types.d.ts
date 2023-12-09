

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
    id?: string;
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

export interface ApiFromPath {
    get: (path: string, ...args: any[]) => Promise;
    post: (path: string, ...args: any[]) => Promise;
    put: (path: string, ...args: any[]) => Promise;
}