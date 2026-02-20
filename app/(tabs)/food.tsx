import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { Colors } from '../../src/constants/Colors';

export default function FoodScreen() {
    return (
        <ScreenWrapper style={styles.container}>
            <Text style={styles.title}>Food Log</Text>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
    },
});
