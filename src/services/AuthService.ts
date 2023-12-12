import {createApiFromPath} from "../api";
import {ApiFromPath, User} from "../types";

export interface UserData extends User {
    password: string;
}

interface AuthData {
    data: {
        token: string;
        name?: string;
    }
}

export default class AuthService {
    private static userApi: ApiFromPath = createApiFromPath("/user");
    static async getUser(): Promise<User> {
        return this.userApi.get("/info");
    }
    static async login(user: UserData): Promise<AuthData> {
        return this.userApi.post("/login", user);
    }
    static async signup(user: UserData): Promise<AuthData> {
        return this.userApi.post("/signup", user);
    }
    static async update(user: UserData) {
        return this.userApi.put("/update", user);
    }
    static async auth(): Promise<AuthData> {
        return this.userApi.get("/auth");
    }
}