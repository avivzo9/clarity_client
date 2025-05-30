import RoundButton from "@/app/cmps/ui/RoundButton";
import TextField from "@/app/cmps/ui/TextField";
import { UserLogin } from "@/app/models/User.mdl";
import { theme } from "@/app/theme";
import { LinearGradient } from 'expo-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface SignupProps {
    onSubmit: (user: UserLogin) => void;
    toggleAuth: () => void;
}

export default function Login({ toggleAuth, onSubmit }: SignupProps) {
    const { control, formState: { errors }, handleSubmit } = useForm<UserLogin>();

    return (
        <LinearGradient colors={[theme.colors.primary, '#003B73']} style={styles.container}>
            <View>
                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            label="Email"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            keyboardType="email-address"
                        />
                    )}
                />
                {errors.email && <Text style={styles.error}>{errors.email?.message}</Text>}

                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            label="Password"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                />
                {errors.password && <Text style={styles.error}>{errors.password?.message}</Text>}
            </View>

            <RoundButton text="Login" onClick={handleSubmit(onSubmit)} />

            <View style={styles.signupSwitch}>
                <Text style={{ fontWeight: 'bold' }}>Don't have an account?</Text>
                <Text style={styles.signupText} onPress={toggleAuth}>Sign Up</Text>
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