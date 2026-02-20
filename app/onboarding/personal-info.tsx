import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { Button } from '../../src/components/Button';
import { Colors } from '../../src/constants/Colors';
import { useOnboarding } from '../../src/context/OnboardingContext';

export default function PersonalInfoScreen() {
    const router = useRouter();
    const { data, updateData } = useOnboarding();

    const handleGenderSelect = (gender: 'Male' | 'Female') => {
        updateData('gender', gender);
    };

    const isFormValid = () => {
        return (
            data.gender &&
            data.age.trim() !== '' &&
            data.height.trim() !== '' &&
            data.currentWeight.trim() !== ''
        );
    };

    const handleNext = () => {
        if (isFormValid()) {
            router.push('/onboarding/activity');
        }
    };

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Text style={styles.title}>Tell us about yourself</Text>
                    <Text style={styles.subtitle}>To calculate your personalized plan, we need a few details.</Text>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[
                                styles.genderButton,
                                data.gender === 'Male' && styles.genderButtonSelected,
                            ]}
                            onPress={() => handleGenderSelect('Male')}
                        >
                            <Text style={[styles.genderText, data.gender === 'Male' && styles.genderTextSelected]}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.genderButton,
                                data.gender === 'Female' && styles.genderButtonSelected,
                            ]}
                            onPress={() => handleGenderSelect('Female')}
                        >
                            <Text style={[styles.genderText, data.gender === 'Female' && styles.genderTextSelected]}>Female</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 25"
                        keyboardType="numeric"
                        value={data.age}
                        onChangeText={(text) => updateData('age', text)}
                        placeholderTextColor={Colors.textLight}
                    />

                    <Text style={styles.label}>Height (cm)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 175"
                        keyboardType="numeric"
                        value={data.height}
                        onChangeText={(text) => updateData('height', text)}
                        placeholderTextColor={Colors.textLight}
                    />

                    <Text style={styles.label}>Current Weight (kg)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 70"
                        keyboardType="numeric"
                        value={data.currentWeight}
                        onChangeText={(text) => updateData('currentWeight', text)}
                        placeholderTextColor={Colors.textLight}
                    />
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Next"
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
    formSection: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 8,
        marginTop: 16,
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
    genderContainer: {
        flexDirection: 'row',
        gap: 15,
    },
    genderButton: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
    },
    genderButtonSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primary + '10', // 10% opacity primary color
    },
    genderText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    genderTextSelected: {
        color: Colors.primary,
    },
    footer: {
        marginTop: 30,
        marginBottom: 20,
    },
});
