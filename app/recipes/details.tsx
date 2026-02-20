import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { Button } from '../../src/components/Button';
import { Colors } from '../../src/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function RecipeDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { title, image, calories, time } = params;

    // Mock ingredients and instructions
    const ingredients = [
        '2 slices whole grain bread',
        '1 ripe avocado',
        '1 large egg',
        'Salt and pepper',
        'Chili flakes (optional)',
    ];

    const instructions = [
        'Toast the bread until golden brown.',
        'Mash the avocado with salt and pepper.',
        'Fry the egg to your liking.',
        'Spread avocado on toast and top with egg.',
        'Sprinkle with chili flakes and serve.',
    ];

    return (
        <ScreenWrapper style={{ padding: 0 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={{ uri: image as string }} style={styles.image} />

                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color={Colors.white} />
                </TouchableOpacity>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.metaScroll}>
                            <View style={styles.metaItem}>
                                <Ionicons name="flame-outline" size={18} color={Colors.primary} />
                                <Text style={styles.metaText}>{calories} kcal</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="time-outline" size={18} color={Colors.secondary} />
                                <Text style={styles.metaText}>{time}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                        {ingredients.map((item, index) => (
                            <View key={index} style={styles.listItem}>
                                <View style={styles.bullet} />
                                <Text style={styles.listText}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Instructions</Text>
                        {instructions.map((item, index) => (
                            <View key={index} style={styles.listItem}>
                                <Text style={styles.stepNum}>{index + 1}.</Text>
                                <Text style={styles.listText}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[styles.logButton, { backgroundColor: Colors.primary }]}
                        onPress={() => router.dismissTo('/(tabs)')}
                    >
                        <Text style={styles.logButtonText}>Log Recipe</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40,
    },
    image: {
        width: '100%',
        height: 350,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    content: {
        backgroundColor: Colors.white,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        minHeight: 500,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 16,
    },
    metaScroll: {
        flexDirection: 'row',
        gap: 15,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#F7F8FA',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
    },
    metaText: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 15,
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'flex-start',
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.primary,
        marginTop: 9,
        marginRight: 12,
    },
    stepNum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
        marginRight: 12,
        width: 24,
    },
    listText: {
        fontSize: 16,
        color: Colors.textLight,
        lineHeight: 24,
        flex: 1,
    },
    logButton: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#00B894',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    logButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
