import RoundButton from "@/app/cmps/ui/RoundButton";
import TextField from "@/app/cmps/ui/TextField";
import { UserSignup } from "@/app/models/User.mdl";
import { theme } from "@/app/theme";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface SignupProps {
    onSubmit: (user: UserSignup) => void;
    toggleAuth: () => void;
}

export default function Signup({ toggleAuth, onSubmit }: SignupProps) {
    const [user, setUser] = useState<UserSignup | null>({
        username: 'avivzo9',
        email: 'avivzo9@gmail.com',
        password: '123456789'
    });

    const handleChange = (field: keyof UserSignup, value: string) => {
        setUser(prev => ({ ...prev, [field]: value } as UserSignup));
    }

    const handleSubmit = () => {
        if (user?.email && user?.password && user?.username) onSubmit(user);
        else alert('Please fill in all fields');
    }

    return (
        <LinearGradient colors={[theme.colors.primary, '#003B73']} style={styles.container}>
            <View>
                <TextField
                    label="Username"
                    value={user?.username || ''}
                    onChange={txt => handleChange('username', txt)}
                />
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

            <RoundButton onClick={handleSubmit}>Sign Up</RoundButton>

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
});