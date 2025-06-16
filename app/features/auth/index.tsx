import { UserLogin, UserSignup } from "@/lib/src/models/User.mdl";
import { useAuth } from "@/lib/src/store/auth.store";
import { GoogleAuthProvider } from "@firebase/auth";
import * as Google from 'expo-auth-session/providers/google';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import AuthForm from "./AuthForm";

export default function AuthLayout() {
    const { isAuthenticated, login, signup } = useAuth();

    const [error, setError] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (isAuthenticated) router.push('/features/transactions');
        signInWithGoogle()
    }, [isAuthenticated]);

    const onSubmit = async (user: UserLogin | UserSignup) => {
        try {
            if (isLogin) await login(user as UserLogin);
            else await signup(user as UserSignup);
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication');
        }
    };

    const signInWithGoogle = async () => {
        console.log('Platform.OS:', Platform.OS)
        if (Platform.OS === 'web') {
            const provider = new GoogleAuthProvider();
            // return await signInWithPopup(this.firebaseAuth, provider);
        } else {
            const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
                clientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
                androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
                webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID
            });

            const result = await promptAsync();
            console.log('result:', result)

            if (result?.type === 'success') {
                const { id_token } = result.params;
                const credential = GoogleAuthProvider.credential(id_token);
                console.log('credential:', credential)
                // await signInWithCredential(this.firebaseAuth, credential);
            }
        }
    }

    return (
        <AuthForm
            isLogin={isLogin}
            toggleAuth={() => setIsLogin(!isLogin)}
            onSubmit={onSubmit}
            error={error}
        />
    );
}