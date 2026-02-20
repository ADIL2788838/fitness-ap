import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors'; // Adjust path as needed

interface ScreenWrapperProps {
    children: React.ReactNode;
    style?: ViewStyle;
    backgroundColor?: string;
    unsafe?: boolean; // If true, uses View instead of SafeAreaView
}

export const ScreenWrapper = ({
    children,
    style,
    backgroundColor = Colors.background,
    unsafe = false
}: ScreenWrapperProps) => {
    const Container = unsafe ? View : SafeAreaView;

    return (
        <Container style={[styles.container, { backgroundColor }, style]}>
            {children}
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
