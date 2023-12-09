import {createApiFromPath} from "../api";
import {ApiFromPath, User} from "../types";

interface LoginUser {
    phoneNumber: number;
    password: string;
}

interface SignupUpdateUser extends User {
    password: string;
}

export default class AuthService {
    private static userApi: ApiFromPath = createApiFromPath("/user");
    static async getUser() {
        return this.userApi.get("/info");
    }
    static async login(user: LoginUser) {
        return this.userApi.post("/login", user);
    }
    static async signup(user: SignupUpdateUser) {
        return this.userApi.post("/signup", user);
    }
    static async update(user: SignupUpdateUser) {
        return this.userApi.put("/update", user);
    }
    static async auth() {
        return this.userApi.get("/auth");
    }
}