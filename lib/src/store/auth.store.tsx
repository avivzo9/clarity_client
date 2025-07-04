import React, { createContext, useContext, useEffect, useState } from "react";
import services from "../clients/client";
import { ApiError } from "../models/ApiError";
import { User, UserLogin, UserSignup } from "../models/User.mdl";

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

interface AuthContextProps extends AuthState {
    login: (user: UserLogin) => Promise<void>;
    signup: (user: UserSignup) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        user: null
    });

    useEffect(() => {
        testSignup();
        // getCurrentUser();
    }, []);

    const testSignup = async () => {
        try {
            const user = await services.auth.signInWithGoogle();
            console.log('user:', user)
        } catch (err: any) {
            const error = err as ApiError;
            console.error('Error during Google login:', error.message);
            throw new Error(error.message);
        }
    }

    // const getCurrentUser = async () => {
    //     try {
    //         const user = await services.auth.currentUser();

    //         if (user) setAuthState({ isAuthenticated: true, user });
    //     } catch (err) {
    //         setAuthState({ isAuthenticated: false, user: null });
    //     }
    // };

    const login = async (user: UserLogin) => {
        try {
            const userData = await services.auth.login(user);

            setAuthState({ isAuthenticated: true, user: userData });
        } catch (err: any) {
            const error = err as ApiError;
            throw new Error(error.message);
        }
    };

    const signup = async (user: UserSignup) => {
        try {
            const userData = await services.auth.signup(user);

            setAuthState({ isAuthenticated: true, user: userData });
        } catch (err: any) {
            const error = err as ApiError;
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        try {
            await services.auth.logout();

            setAuthState({ isAuthenticated: false, user: null });
        } catch (err: any) {
            const error = err as ApiError;
            throw new Error(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

export default {};