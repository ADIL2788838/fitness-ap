import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { Button } from '../../src/components/Button';
import { Colors } from '../../src/constants/Colors';
import { useOnboarding } from '../../src/context/OnboardingContext';

const activityLevels = [
    {
        id: 'Sedentary',
        title: 'Sedentary',
        description: 'Little or no exercise, desk job',
    },
    {
        id: 'Lightly Active',
        title: 'Lightly Active',
        description: 'Light exercise/sports 1-3 days/week',
    },
    {
        id: 'Active',
        title: 'Active',
        description: 'Moderate exercise/sports 3-5 days/week',
    },
    {
        id: 'Very Active',
        title: 'Very Active',
        description: 'Hard exercise/sports 6-7 days/week',
    },
];

export default function ActivityScreen() {
    const router = useRouter();
    const { data, updateData } = useOnboarding();

    const handleLevelSelect = (level: string) => {
        updateData('activityLevel', level);
    };

    const handleNext = () => {
        if (data.activityLevel) {
            router.push('/onboarding/target');
        }
    };

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>How active are you?</Text>
                    <Text style={styles.subtitle}>This helps us calculate your daily calorie burn.</Text>
                </View>

                <View style={styles.options}>
                    {activityLevels.map((level) => (
                        <TouchableOpacity
                            key={level.id}
                            style={[
                                styles.optionCard,
                                data.activityLevel === level.id && styles.optionSelected,
                            ]}
                            onPress={() => handleLevelSelect(level.id)}
                            activeOpacity={0.7}
                        >
                            <View>
                                <Text style={[styles.optionTitle, data.activityLevel === level.id && styles.textSelected]}>
                                    {level.title}
                                </Text>
                                <Text style={styles.optionDescription}>
                                    {level.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Next"
                        onPress={handleNext}
                        disabled={!data.activityLevel}
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
        marginBottom: 20,
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
        gap: 15,
    },
    optionCard: {
        padding: 20,
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
    optionTitle: {
        fontSize: 18,
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
    footer: {
        marginTop: 20,
        marginBottom: 20,
    },
});
