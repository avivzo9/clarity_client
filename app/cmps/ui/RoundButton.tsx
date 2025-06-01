import { StyleSheet, View } from "react-native";
import { Button, ButtonProps, Text } from "react-native-paper";
import { theme } from "../../theme";

export default function RoundButton(props: ButtonProps) {
    return (
        <Button {...props} style={[styles.button, props.style]} mode="contained">
            <View style={{ height: styles.button.height - 20, ...styles.txtView }}>
                <Text style={{ height: 'auto', color: theme.colors.white }}>{props.children}</Text>
            </View>
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 60,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: theme.border.radius,
        backgroundColor: theme.colors.primary,
    },
    txtView: {
        justifyContent: 'center',
        alignContent: 'center',
    }
});