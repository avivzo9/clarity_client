import { StyleSheet } from "react-native";
import { Button, ButtonProps } from "react-native-paper";
import { theme } from "../../theme";

export default function RoundButton(props: ButtonProps) {
    return (
        <Button {...props} style={[styles.button, props.style]} mode="contained" />
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