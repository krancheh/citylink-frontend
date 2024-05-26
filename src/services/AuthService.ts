import { createApiFromPath } from "../api";
import { ApiFromPath, User } from "../types";

export interface UserData extends User {
    password?: string;
}

interface UpdateUserData extends Omit<UserData, "phoneNumber"> {
    phoneNumber?: number;
}

interface AuthData {
    data: {
        token: string;
        name?: string;
    }
}

interface GetUserData {
    data: {
        user: User;
    }
}

export default class AuthService {
    private static userApi: ApiFromPath = createApiFromPath("/user");
    static async getUser(): Promise<GetUserData> {
        return this.userApi.get("/info");
    }
    static async login(user: UserData): Promise<AuthData> {
        return this.userApi.post("/login", user);
    }
    static async signup(user: UserData): Promise<AuthData> {
        return this.userApi.post("/signup", user);
    }
    static async update(user: UpdateUserData) {
        return this.userApi.patch("/update", user);
    }
    static async auth(): Promise<AuthData> {
        return this.userApi.get("/auth");
    }
}