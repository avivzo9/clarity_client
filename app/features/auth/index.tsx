import RoundButton from "@/app/cmps/ui/RoundButton";
import { UserLogin, UserSignup } from "@/app/models/User.mdl";
import { useAuth } from "@/app/store/auth.store";
import { useState } from "react";
import { Text, View } from "react-native";
import Login from "./login";
import Signup from "./signup";

export default function AuthLayout() {
    const { user, login, signup, logout } = useAuth();

    const [AuthType, setAuthType] = useState<'login' | 'signup'>('login');

    const onSubmit = async (user: UserLogin | UserSignup) => {
        try {
            console.log('login user:', user)
            if (AuthType === 'login') login(user as UserLogin);
            else await signup(user as UserSignup);
        } catch (err: any) {
            console.error('Auth error:', err);
            // Handle error, e.g., show a toast or alert
            alert(err.message || 'An error occurred during authentication');
        }
    }

    if (user) {
        return (<View>
            <Text>{user.username} is logged‐in</Text>
            <RoundButton text="Logout" onClick={logout} />
        </View>)
    }

    return AuthType === 'login' ?
        <Login toggleAuth={() => setAuthType('signup')} onSubmit={onSubmit} /> :
        <Signup toggleAuth={() => setAuthType('login')} onSubmit={onSubmit} />;
}