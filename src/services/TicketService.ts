import { ApiFromPath, City, TicketType } from "../types";
import { createApiFromPath } from "../api";

interface RouteData {
    departureCity: string;
    destinationCity: string;
    departureDate?: string;
}

export default class TicketService {
    private static ticketsApi: ApiFromPath = createApiFromPath("/tickets");
    private static routesApi: ApiFromPath = createApiFromPath("/routes");
    static async addTicket(id: string) {
        return this.ticketsApi.post("/addTicket", { id });
    }
    static async getTickets(): Promise<{ data: { tickets: TicketType[] } }> {
        return this.ticketsApi.get("/getUserTickets");
    }
    static async getRoutes(route: RouteData) {
        return this.routesApi.get("/getRouteRecords", { params: route });
    }
    static async getCities(cityName: string): Promise<{ data: { cities: City[] } }> {
        return this.routesApi.get("/getCities", { params: { cityName: cityName } })
    }
}