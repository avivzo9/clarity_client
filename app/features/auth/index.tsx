import { UserLogin, UserSignup } from "@/lib/src/models/User.mdl";
import { useAuth } from "@/lib/src/store/auth.store";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import AuthForm from "../../cmps/auth/AuthForm";

const AuthLayout = () => {
    const { isAuthenticated, login, signup } = useAuth();

    const [error, setError] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (isAuthenticated) router.push('/features/transactions');
    }, [isAuthenticated]);

    const onSubmit = async (user: UserLogin | UserSignup) => {
        try {
            if (isLogin) await login(user as UserLogin);
            else await signup(user as UserSignup);
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication');
        }
    };

    return (
        <AuthForm
            isLogin={isLogin}
            toggleAuth={() => setIsLogin(!isLogin)}
            onSubmit={onSubmit}
            error={error}
        />
    );
}

export default AuthLayout;