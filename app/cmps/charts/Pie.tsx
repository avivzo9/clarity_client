import { theme } from "@/app/theme";
import { useEffect, useMemo, useRef } from "react";
import { Animated, Dimensions, Easing, View } from "react-native";
import Svg, { Circle } from 'react-native-svg';

interface PieChartProps {
    values: number[];
    colors?: string[];
    relativeSize?: number;
    strokeWidth?: number;
}

interface Segment {
    percentage: number;
    startAngle: number; // in degrees
}

interface DonutProps {
    color: string;
    percentage: number;
    startAngle: number;
}

const colors = ['#ff6667', '#42d7b5', '#f8b501', '#1869ff', '#ff8c42', '#42a5f5', '#66bb6a', '#ab47bc'];

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function PieChart({ values, relativeSize, strokeWidth = 18 }: PieChartProps) {
    console.log('values:', values)
    const screenWidth = Dimensions.get('screen').width;
    const size = screenWidth / (relativeSize || 4);
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circum = 2 * Math.PI * radius;

    // if no data, draw a full gray circle
    if (!values.length) {
        return (
            <View style={{ padding: theme.padding.m }}>
                <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke={theme.colors.light}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                </Svg>
            </View>
        );
    }

    const totalAmount = useMemo(() =>
        values.reduce((acc, curr) => acc + curr, 0),
        [values]);

    const segments = useMemo<Segment[]>(() => {
        let cumulative = 0;

        return values.map(amount => {
            const pct = amount / totalAmount;
            const startAngle = cumulative * 360;
            cumulative += pct;
            return { percentage: pct, startAngle };
        });
    }, [totalAmount]);

    const Donut = ({ percentage, startAngle, color }: DonutProps) => {
        const segmentLen = circum * percentage;
        const gapLen = circum - segmentLen;

        // animated value for dashOffset
        const animatedOffset = useRef(new Animated.Value(circum)).current;
        const animatedStrokeWidth = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.timing(animatedOffset, {
                toValue: 0,
                duration: 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false
            }).start();

            Animated.timing(animatedStrokeWidth, {
                toValue: strokeWidth,
                duration: 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false
            }).start();
        }, []);

        return (
            <AnimatedCircle
                cx={center}
                cy={center}
                r={radius}
                stroke={color}
                strokeWidth={animatedStrokeWidth}
                strokeDasharray={`${segmentLen} ${gapLen}`}
                strokeDashoffset={animatedOffset}
                transform={`rotate(${startAngle - 90}, ${center}, ${center})`}
                fill="transparent"
                strokeLinecap="butt"
                strokeLinejoin="round"
            />
        );
    };

    return (
        <View style={{ padding: theme.padding.m }}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {segments.map((seg, index) => (
                    <Donut
                        key={index}
                        percentage={seg.percentage}
                        startAngle={seg.startAngle}
                        color={colors[index % colors.length]}
                    />
                ))}
            </Svg>
        </View>
    );
}