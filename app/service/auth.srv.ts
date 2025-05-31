import api from "../clients/api";
import { User, UserLogin, UserSignup } from "../models/User.mdl";

export class AuthService {

    async login(userToLogin: UserLogin): Promise<any> {
        try {
            const res = await api.post<User>('/auth/signin', userToLogin);

            if (res.status !== 200) throw new Error('Failed to login');

            return Promise.resolve(res.data);
        } catch (err: any) {
            if (err.response && err.response.data) {
                return Promise.reject(err.response.data);
            }

            return Promise.reject(err);
        }
    }

    async signup(userToSignup: UserSignup): Promise<any> {
        try {
            const res = await api.post<User>('/auth/signup', userToSignup);

            if (res.status !== 201) throw new Error('Failed to signup');

            return Promise.resolve(res.data);
        } catch (err: any) {
            if (err.response && err.response.data) {
                return Promise.reject(err.response.data);
            }

            return Promise.reject(err);
        }
    }

    async currentUser(): Promise<User | null> {
        try {
            const res = await api.get<User>('/auth/currentuser');

            if (res.status !== 200) throw new Error('Failed to fetch current user');

            return Promise.resolve(res.data);
        } catch (err: any) {
            if (err.response && err.response.data) {
                return Promise.reject(err.response.data);
            }

            return Promise.reject(err);
        }
    }

    async logout(): Promise<void> {
        try {
            const res = await api.post('/auth/signout');

            if (res.status !== 200) throw new Error('Failed to logout');

            return Promise.resolve();
        } catch (err: any) {
            if (err.response && err.response.data) {
                return Promise.reject(err.response.data);
            }

            return Promise.reject(err);
        }
    }
}