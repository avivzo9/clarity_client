import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#38bdf8',
        secondary: 'black',
        white: '#ffffff',
    },
    border: {
        radius: 15
    },
    padding: {
        xs: 10,
        s: 15,
        m: 20,
        l: 30
    }
};