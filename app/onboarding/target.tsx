import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { Button } from '../../src/components/Button';
import { Colors } from '../../src/constants/Colors';
import { useOnboarding } from '../../src/context/OnboardingContext';

const speedOptions = [
    {
        id: 'Slow',
        title: 'Slow & Steady',
        description: 'Lose 0.25kg / week',
        sustainable: 'High',
    },
    {
        id: 'Moderate',
        title: 'Moderate',
        description: 'Lose 0.5kg / week',
        sustainable: 'Medium',
    },
    {
        id: 'Aggressive',
        title: 'Aggressive',
        description: 'Lose 0.75kg / week',
        sustainable: 'Hard',
    },
];

export default function TargetScreen() {
    const router = useRouter();
    const { data, updateData } = useOnboarding();

    const handleSpeedSelect = (speed: string) => {
        updateData('speed', speed);
    };

    const isFormValid = () => {
        return data.targetWeight.trim() !== '' && data.speed;
    };

    const handleNext = () => {
        if (isFormValid()) {
            router.push('/onboarding/signup');
        }
    };

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Text style={styles.title}>Set your target</Text>
                    <Text style={styles.subtitle}>What is your goal weight and how fast do you want to reach it?</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Target Weight (kg)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 65"
                        keyboardType="numeric"
                        value={data.targetWeight}
                        onChangeText={(text) => updateData('targetWeight', text)}
                        placeholderTextColor={Colors.textLight}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Pace</Text>
                    <View style={styles.options}>
                        {speedOptions.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.optionCard,
                                    data.speed === option.id && styles.optionSelected,
                                ]}
                                onPress={() => handleSpeedSelect(option.id)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.optionContent}>
                                    <Text style={[styles.optionTitle, data.speed === option.id && styles.textSelected]}>
                                        {option.title}
                                    </Text>
                                    <Text style={styles.optionDescription}>
                                        {option.description}
                                    </Text>
                                </View>
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{option.sustainable}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Continue"
                        onPress={handleNext}
                        disabled={!isFormValid()}
                    />
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    header: {
        marginTop: 20,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textLight,
    },
    section: {
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 8,
    },
    input: {
        backgroundColor: Colors.white,
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
        color: Colors.text,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    options: {
        gap: 12,
    },
    optionCard: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: Colors.white,
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    optionSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
    },
    optionContent: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    optionDescription: {
        fontSize: 14,
        color: Colors.textLight,
    },
    textSelected: {
        color: Colors.primary,
    },
    badge: {
        backgroundColor: Colors.background,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.text,
    },
    footer: {
        marginTop: 20,
        marginBottom: 20,
    },
});
