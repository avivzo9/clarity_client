import { ImageBackground, StyleSheet, View } from "react-native";

interface BackgroundImgViewProps {
    children: React.ReactNode;
    imageName: keyof typeof imagesMap;
}

const imagesMap: Record<string, any> = {
    // "login": require("../../assets/login.png"),
};

export default function BackgroundImgView({ children, imageName }: BackgroundImgViewProps) {
    const imageSrc = imagesMap[imageName];

    return (
        <View>
            <ImageBackground style={styles.container} source={imageSrc} resizeMode="cover">
                {children}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    }
})