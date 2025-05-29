import { KeyboardTypeOptions, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface TextFieldProps {
    label: string;
    value: string;
    onChange: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
}

export default function TextField({ label, value, onChange, secureTextEntry, keyboardType }: TextFieldProps) {

    return (
        <TextInput
            label={label}
            value={value}
            onChangeText={onChange}
            style={styles.inputField}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
        />
    )
}

const styles = StyleSheet.create({
    inputField: {
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: '#f2f2f2',
    },
});