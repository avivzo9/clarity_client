import { UserLogin, UserSignup } from "@/app/models/User.mdl";
import { useAuth } from "@/app/store/auth.store";
import { useState } from "react";
import { Text } from "react-native";
import Login from "./login";
import Signup from "./signup";

export default function AuthLayout() {
    const { user, login, signup } = useAuth();

    const [AuthType, setAuthType] = useState<'login' | 'signup'>('login');

    const onSubmit = (user: UserLogin | UserSignup) => {
        if (AuthType === 'login') login(user as UserLogin);
        else signup(user as UserSignup);
    }

    if (user) {
        // Redirect to home or dashboard if user is already authenticated
        return <Text>{user.username} is logged‐in</Text>; // Replace with navigation logic if needed
    }

    return AuthType === 'login' ?
        <Login toggleAuth={() => setAuthType('signup')} onSubmit={onSubmit} /> :
        <Signup toggleAuth={() => setAuthType('login')} onSubmit={onSubmit} />;
}