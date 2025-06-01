import { StyleSheet } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

export default function TextField(props: TextInputProps) {

    return <TextInput {...props} underlineColorAndroid="transparent" style={styles.inputField} />
}

const styles = StyleSheet.create({
    inputField: {
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: '#f2f2f2',
    },
});