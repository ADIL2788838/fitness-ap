import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { Colors } from '../constants/Colors';

interface LineChartProps {
    data: number[];
    labels: string[];
    width?: number;
    height?: number;
    color?: string;
}

export const LineChart = ({
    data,
    labels,
    width = Dimensions.get('window').width - 40,
    height = 220,
    color = Colors.primary,
}: LineChartProps) => {
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * chartWidth + padding;
        const y = ((max - value) / range) * chartHeight + padding;
        return { x, y, value };
    });

    const pathD = points.reduce((acc, point, index) => {
        return index === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
    }, '');

    return (
        <View style={styles.container}>
            <Svg width={width} height={height}>
                {/* Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((t) => {
                    const y = t * chartHeight + padding;
                    return (
                        <Line
                            key={t}
                            x1={padding}
                            y1={y}
                            x2={width - padding}
                            y2={y}
                            stroke={Colors.border}
                            strokeDasharray="4 4"
                            strokeWidth={1}
                        />
                    );
                })}

                {/* Line Path */}
                <Path d={pathD} stroke={color} strokeWidth={3} fill="none" />

                {/* Data Points */}
                {points.map((point, index) => (
                    <Circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r={5}
                        fill={Colors.white}
                        stroke={color}
                        strokeWidth={2}
                    />
                ))}

                {/* Labels */}
                {labels.map((label, index) => {
                    const x = (index / (labels.length - 1)) * chartWidth + padding;
                    return (
                        <SvgText
                            key={index}
                            x={x}
                            y={height - 5}
                            fontSize="10"
                            fill={Colors.textLight}
                            textAnchor="middle"
                        >
                            {label}
                        </SvgText>
                    )
                })}
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
