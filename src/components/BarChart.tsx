import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { Colors } from '../constants/Colors';

interface BarChartProps {
    data: { label: string; value: number }[];
    width?: number;
    height?: number;
    color?: string;
    maxValue?: number;
}

export const BarChart = ({
    data,
    width = Dimensions.get('window').width - 40,
    height = 220,
    color = Colors.primary,
    maxValue,
}: BarChartProps) => {
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = (chartWidth / data.length) * 0.6;
    const spacing = (chartWidth / data.length) * 0.4;

    const max = maxValue || Math.max(...data.map((d) => d.value)) || 1;

    return (
        <View style={styles.container}>
            <Svg width={width} height={height}>
                {data.map((item, index) => {
                    const barHeight = (item.value / max) * chartHeight;
                    const x = padding + index * (barWidth + spacing) + spacing / 2;
                    const y = height - padding - barHeight;

                    return (
                        <React.Fragment key={index}>
                            <Rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={barHeight}
                                fill={color}
                                rx={4}
                            />
                            <SvgText
                                x={x + barWidth / 2}
                                y={height - 5}
                                fontSize="10"
                                fill={Colors.textLight}
                                textAnchor="middle"
                            >
                                {item.label}
                            </SvgText>
                        </React.Fragment>
                    );
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
