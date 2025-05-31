import RoundButton from "@/app/cmps/ui/RoundButton";
import TextField from "@/app/cmps/ui/TextField";
import { UserSignup } from "@/app/models/User.mdl";
import { theme } from "@/app/theme";
import { LinearGradient } from 'expo-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface SignupProps {
    onSubmit: (user: UserSignup) => void;
    toggleAuth: () => void;
}

export default function Signup({ toggleAuth, onSubmit }: SignupProps) {
    const { control, formState: { errors }, handleSubmit } = useForm<UserSignup>();

    return (
        <LinearGradient colors={[theme.colors.primary, '#003B73']} style={styles.container}>
            <View>
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: 'Username is required' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            label="Username"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

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

            <RoundButton text="Sign Up" onClick={handleSubmit(onSubmit)} />


            <View style={styles.signupSwitch}>
                <Text style={{ fontWeight: 'bold' }}>Have an account?</Text>
                <Text style={styles.signupText} onPress={toggleAuth}>Log In</Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.white,
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