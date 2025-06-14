import { configureFonts, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { MD3Type } from 'react-native-paper/lib/typescript/types';

const fontConfig: Record<string, MD3Type> = {
    regular: {
        fontFamily: 'Zain-Regular',
        fontWeight: 'normal',
        letterSpacing: 0.1,
        lineHeight: 20,
        fontSize: 16,
    },
    medium: {
        fontFamily: 'Roboto-Medium',
        fontWeight: 'normal',
        letterSpacing: 0.1,
        lineHeight: 22,
        fontSize: 16,
    },
    light: {
        fontFamily: 'Zain-Light',
        fontWeight: 'normal',
        letterSpacing: 0.1,
        lineHeight: 18,
        fontSize: 16,
    },
    thin: {
        fontFamily: 'Roboto-Thin',
        fontWeight: 'normal',
        letterSpacing: 0.1,
        lineHeight: 16,
        fontSize: 16,
    },
    default: {
        fontFamily: 'Zain-Regular',
        fontWeight: 'normal',
        letterSpacing: 0.1,
        lineHeight: 20,
        fontSize: 16,
    },
};

const theme = {
    ...DefaultTheme,
    fonts: configureFonts({ config: fontConfig, isV3: true }),
    colors: {
        ...DefaultTheme.colors,
        primary: '#38bdf8',
        secondary: 'black',
        white: '#ffffff',
        lightBgc: '#f0f0f0',
        light: '#8d8d8d'
    },
    border: {
        radius: 15,
    },
    padding: {
        xxs: 5,
        xs: 10,
        s: 15,
        m: 20,
        l: 30,
    },
    margin: {
        xxs: 5,
        xs: 10,
        s: 15,
        m: 20,
        l: 30,
    },
};

export default theme;