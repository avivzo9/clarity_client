import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { theme } from "../../theme";

interface RoundButtonProps {
    text: string;
    onClick: () => void;
}

export default function RoundButton({ text, onClick }: RoundButtonProps) {
    return (
        <Button onPress={onClick} style={styles.button} mode="contained" >
            <Text>{text}</Text>
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: theme.border.radius,
        paddingVertical: theme.padding.xs,
        paddingHorizontal: theme.padding.m,
        backgroundColor: theme.colors.primary,
    },
});