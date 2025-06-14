import RoundButton from "@/app/cmps/ui/RoundButton";
import TextField from "@/app/cmps/ui/TextField";
import { UserLogin, UserSignup } from "@/lib/src/models/User.mdl";
import theme from "@/lib/src/theme";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from "react";
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { Animated, Platform, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface AuthFormProps {
    isLogin: boolean;
    onSubmit: (user: UserLogin | UserSignup) => void;
    toggleAuth: () => void;
    error?: string | null;
}

export default function AuthForm({ isLogin, toggleAuth, onSubmit, error }: AuthFormProps) {
    const { control, formState: { errors }, handleSubmit } = useForm<UserLogin | UserSignup>();

    const usernameOpacity = useRef(new Animated.Value(0)).current;
    const inputAnimation = Animated.timing(usernameOpacity, {
        toValue: isLogin ? 0 : 1,
        duration: 300,
        useNativeDriver: true
    })

    useEffect(() => {
        inputAnimation.start();
    }, [isLogin]);

    return (
        <LinearGradient colors={[theme.colors.primary, '#003B73']} style={styles.container}>
            <View>
                <Animated.View style={{ opacity: usernameOpacity }}>
                    <Controller
                        name="username"
                        control={control}
                        rules={!isLogin ? { required: 'Username is required' } : undefined} // Only require username if not in login mode
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                label="Username"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {(errors as FieldErrors<UserSignup>)?.username && <Text style={styles.error}>{(errors as FieldErrors<UserSignup>)?.username?.message}</Text>}
                </Animated.View>

                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Email is invalid',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            label="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="email-address"
                        />
                    )}
                />
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'Password is required',
                        minLength: 8,
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message: 'Password must be at least 8 characters long and contain at least one letter and one number',
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            label="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                />
                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}

            <RoundButton onPress={handleSubmit(onSubmit)}>{isLogin ? "Login" : "Sign Up"}</RoundButton>

            <View>
                <Text>Hi</Text>
                <RoundButton icon={'google'} mode="contained" onPress={() => { }}>Sign In with Google</RoundButton>
            </View>

            <View style={styles.signupSwitch}>
                <Text style={{ fontWeight: 'bold' }}>{isLogin ? "Don't have an account?" : "Have an account?"}</Text>
                <Text style={styles.signupText} onPress={toggleAuth}>{isLogin ? "Sign Up" : "Log In"}</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Platform.OS === 'web' ? '50%' : '100%',
        height: '60%',
        alignSelf: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: theme.border.radius,
        padding: theme.padding.s,
        justifyContent: 'center'
    },
    signupSwitch: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        marginTop: 20,
    },
    signupText: {
        color: theme.colors.primary,
        fontWeight: 'bold'
    },
    error: { color: 'red' }
});
