

export interface TicketType {
    id: string;
    departureCity: string;
    destinationCity: string;
    duration: number;
    price: number;
    departureDate: string | number;
    departureTime?: string;
    arrivalTime?: string
    seatNo?: number;
}

export interface User {
    id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    phoneNumber: string;
    documentNumber?: number;
    ticketsAmount?: number;
    email?: string;
    gender?: boolean;
    birthDate?: number;
    favouriteCity?: string;
    favouriteCityCount?: number;
}

export interface ApiFromPath {
    get: (path: string, ...args: any[]) => Promise;
    post: (path: string, ...args: any[]) => Promise;
    put: (path: string, ...args: any[]) => Promise;
}