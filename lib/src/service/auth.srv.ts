import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential, signInWithPopup, User } from 'firebase/auth';
import { Platform } from "react-native";
import api from "../clients/api";
import { firebaseConfig } from '../config/Firebase';
import { UserLogin, UserSignup } from '../models/User.mdl';

export class AuthService {
    private firebaseAuth = firebaseConfig.auth;

    constructor() {
        // Initialize Firebase Auth if needed
        console.log('this.firebaseAuth:', this.firebaseAuth)
        if (!this.firebaseAuth) {
            throw new Error('Firebase Auth is not initialized');
        }
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

export default {};