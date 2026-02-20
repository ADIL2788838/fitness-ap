import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { Button } from '../../src/components/Button';
import { Colors } from '../../src/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
    const router = useRouter();

    const handleLogin = () => {
        // Navigate to the main app (tabs)
        // In a real app, this would involve authentication logic
        router.replace('/(tabs)');
    };

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Create your account</Text>
                <Text style={styles.subtitle}>Save your progress and access your plan from anywhere.</Text>
            </View>

            <View style={styles.content}>
                <Button
                    title="Continue with Google"
                    onPress={handleLogin}
                    variant="outline"
                    icon={<Ionicons name="logo-google" size={20} color={Colors.text} style={{ marginRight: 10 }} />}
                    style={styles.socialButton}
                />

                <Button
                    title="Continue with Apple"
                    onPress={handleLogin}
                    variant="outline"
                    icon={<Ionicons name="logo-apple" size={20} color={Colors.text} style={{ marginRight: 10 }} />}
                    style={styles.socialButton}
                />

                <View style={styles.divider}>
                    <View style={styles.line} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.line} />
                </View>

                <Button
                    title="Sign up with Email"
                    onPress={handleLogin}
                    style={styles.emailButton}
                />

                <TouchableOpacity onPress={handleLogin} style={styles.loginLink}>
                    <Text style={styles.loginText}>
                        Already have an account? <Text style={styles.loginTextHighlight}>Log In</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textLight,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    content: {
        gap: 16,
    },
    socialButton: {
        backgroundColor: Colors.white,
        borderColor: Colors.border,
        borderWidth: 1,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.border,
    },
    dividerText: {
        marginHorizontal: 10,
        color: Colors.textLight,
        fontSize: 14,
        fontWeight: '600',
    },
    emailButton: {
        backgroundColor: Colors.primary,
    },
    loginLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
        color: Colors.text,
    },
    loginTextHighlight: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
});
