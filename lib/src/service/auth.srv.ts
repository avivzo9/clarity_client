import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential, signInWithPopup, User } from 'firebase/auth';
import { Platform } from "react-native";
import api from "../clients/api";
// import FirebaseConfig from '../config/firebase';
import { firebaseConfig } from '../config/firebase';
import { UserLogin, UserSignup } from '../models/User.mdl';

class AuthService {
    private static instance: AuthService;

    private get firebaseAuth() {
        return firebaseConfig.auth;
    }

    constructor() { }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

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

    async signInWithGoogleForWeb(provider: GoogleAuthProvider) {
        try {
            return await signInWithPopup(this.firebaseAuth, provider);
        } catch (err: any) {
            if (err.response && err.response.data) {
                return Promise.reject(err.response.data);
            }

            return Promise.reject(err);
        }
    }

    async signInWithGoogleForMobile() {

    }

    async signInWithGoogle() {
        if (Platform.OS === 'web') {
            const provider = new GoogleAuthProvider();
            console.log('provider:', provider)
            return await signInWithPopup(this.firebaseAuth, provider);
        } else {
            const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
                clientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,      // iOS client ID
                androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID, // Android client ID
                webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,    // Web client ID
            });

            const result = await promptAsync();

            if (result?.type === 'success') {
                const { id_token } = result.params;
                const credential = GoogleAuthProvider.credential(id_token);
                await signInWithCredential(this.firebaseAuth, credential);
            }
        }
    }
}

export const authService = AuthService.getInstance();