import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { Button } from '../../src/components/Button';
import { Colors } from '../../src/constants/Colors';
import { useOnboarding } from '../../src/context/OnboardingContext';

export default function GoalScreen() {
    const router = useRouter();
    const { data, updateData } = useOnboarding();

    const handleGoalSelect = (goal: any) => {
        updateData('goal', goal);
    };

    const handleNext = () => {
        if (data.goal) {
            router.push('/onboarding/personal-info');
        }
    };

    const goals = ['Lose Weight', 'Maintain Weight', 'Gain Muscle'];

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>What is your main goal?</Text>
                <Text style={styles.subtitle}>Let's start by understanding what you want to achieve.</Text>
            </View>

            <View style={styles.options}>
                {goals.map((goal) => (
                    <TouchableOpacity
                        key={goal}
                        style={[
                            styles.optionCard,
                            data.goal === goal && styles.optionSelected,
                        ]}
                        onPress={() => handleGoalSelect(goal)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.optionText, data.goal === goal && styles.optionTextSelected]}>
                            {goal}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.footer}>
                <Button
                    title="Next"
                    onPress={handleNext}
                    disabled={!data.goal}
                />
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'space-between',
    },
    header: {
        marginTop: 40,
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
    options: {
        flex: 1,
        justifyContent: 'center',
        gap: 15,
    },
    optionCard: {
        padding: 20,
        borderRadius: 16,
        backgroundColor: Colors.white,
        borderWidth: 2,
        borderColor: 'transparent',
        alignItems: 'center',
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    optionSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
    },
    optionText: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
    },
    optionTextSelected: {
        color: Colors.primary,
    },
    footer: {
        marginBottom: 20,
    },
});
