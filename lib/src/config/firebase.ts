import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

class FirebaseConfig {
    private static instance: FirebaseConfig;
    private app: FirebaseApp;
    public auth: Auth;

    private constructor() {
        const firebaseConfig = {
            apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
            measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
        };

        // Initialize Firebase App
        this.app = initializeApp(firebaseConfig);

        // Initialize Firebase Auth
        this.auth = getAuth(this.app);
    }

    public static getInstance(): FirebaseConfig {
        if (!FirebaseConfig.instance) {
            FirebaseConfig.instance = new FirebaseConfig();
        }
        return FirebaseConfig.instance;
    }
}

export const firebaseConfig = FirebaseConfig.getInstance();