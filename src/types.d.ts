

export interface TicketType {
    id: string;
    departureCity: string;
    destinationCity: string;
    duration: number;
    price: number;
    departureDate: string | number;
    seatNo?: number;
}

export interface User {
    id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    phoneNumber: string;
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