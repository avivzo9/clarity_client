import RoundButton from "@/app/cmps/ui/RoundButton";
import TextField from "@/app/cmps/ui/TextField";
import { UserLogin } from "@/app/models/User.mdl";
import { theme } from "@/app/theme";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface LoginProps {
    onSubmit: (user: UserLogin) => void;
    toggleAuth: () => void;
}

export default function Login({ toggleAuth, onSubmit }: LoginProps) {
    const [user, setUser] = useState<UserLogin | null>(null);

    const handleChange = (field: keyof UserLogin, value: string) => {
        setUser(prev => ({ ...prev, [field]: value } as UserLogin));
    }

    const handleSubmit = () => {
        if (user?.email && user?.password) onSubmit(user);
        else alert('Please fill in all fields');
    }

    return (
        <LinearGradient colors={[theme.colors.primary, '#003B73']} style={styles.container}>
            <View>
                <TextField
                    label="Email"
                    value={user?.email || ''}
                    onChange={txt => handleChange('email', txt)}
                    keyboardType="email-address"
                />
                <TextField
                    label="Password"
                    value={user?.password || ''}
                    onChange={txt => handleChange('password', txt)}
                    secureTextEntry
                />
            </View>

            <RoundButton onClick={handleSubmit}>Login</RoundButton>

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
});