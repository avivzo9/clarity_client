import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

class FirebaseConfig {
    private static app: FirebaseApp | null = null;
    private static authInstance: Auth | null = null;

    public static getApp(): FirebaseApp {
        if (!FirebaseConfig.app) {
            const firebaseConfig = {
                apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
                authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
                projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
                storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
                messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
                appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
                measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
            };
            // Check for missing env vars
            Object.entries(firebaseConfig).forEach(([key, value]) => {
                if (!value) {
                    console.warn(`Firebase config missing env var: ${key}`);
                }
            });
            FirebaseConfig.app = initializeApp(firebaseConfig);
        }
        return FirebaseConfig.app;
    }

    public static getAuth(): Auth {
        if (!FirebaseConfig.authInstance) {
            FirebaseConfig.authInstance = getAuth(FirebaseConfig.getApp());
        }
        return FirebaseConfig.authInstance;
    }
}

export const firebaseConfig = {
    get app() {
        return FirebaseConfig.getApp();
    },
    get auth() {
        return FirebaseConfig.getAuth();
    }
};