import RoundButton from "@/app/cmps/ui/RoundButton";
import { UserLogin, UserSignup } from "@/app/models/User.mdl";
import { useAuth } from "@/app/store/auth.store";
import { useState } from "react";
import { Text, View } from "react-native";
import AuthForm from "./AuthForm";

export default function AuthLayout() {
    const { user, login, signup, logout } = useAuth();

    const [error, setError] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState(true);

    const onSubmit = async (user: UserLogin | UserSignup) => {
        console.log('user:', user)
        try {
            if (isLogin) await login(user as UserLogin);
            else await signup(user as UserSignup);
        } catch (err: any) {
            console.error('Auth error:', err);
            setError(err.message || 'An error occurred during authentication');
        }
    };

    if (user) {
        return (
            <View>
                <Text>{user.username} is logged‐in</Text>
                <RoundButton onPress={logout}>Logout</RoundButton>
            </View>
        );
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