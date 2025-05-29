import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { theme } from "../../theme";

interface RoundButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

export default function RoundButton({ children, onClick }: RoundButtonProps) {
    return (
        <Button onPress={onClick} style={styles.button} mode="contained" >
            <Text>{children}</Text>
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