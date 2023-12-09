import {ApiFromPath} from "../types";
import {createApiFromPath} from "../api";

interface RouteData {
    departureCity: string;
    destinationCity: string;
    departureDate: number;
}

export default class TicketService {
    private static ticketsApi: ApiFromPath = createApiFromPath("/tickets");
    private static routesApi: ApiFromPath = createApiFromPath("/routes");
    static async addTicket(id: number) {
        return this.ticketsApi.post("/addTicket", {id});
    }
    static async getTickets() {
        return this.ticketsApi.get("/getTickets");
    }
    static async getRoutes(route: RouteData) {
        return this.routesApi.post("/getRoutes", route);
    }
    static async getSimilarCities(city: string) {
        return this.routesApi.post("/getCities", {city})
    }
}