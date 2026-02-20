import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { Button } from '../../src/components/Button';
import { Colors } from '../../src/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { CircularProgress } from '../../src/components/CircularProgress';

const { width } = Dimensions.get('window');

export default function FoodDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { name, calories, protein, carbs, fat } = params;

    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState('Serving');

    // Parse values to number, fallback to 0
    const baseCal = Number(calories) || 0;
    const baseProtein = Number(protein) || 0;
    const baseCarbs = Number(carbs) || 0;
    const baseFat = Number(fat) || 0;

    const currentCal = Math.round(baseCal * quantity);
    const currentProtein = Math.round(baseProtein * quantity * 10) / 10;
    const currentCarbs = Math.round(baseCarbs * quantity * 10) / 10;
    const currentFat = Math.round(baseFat * quantity * 10) / 10;

    const handleAddFood = () => {
        router.dismissTo('/(tabs)');
    };

    const MacroItem = ({ label, value, color, icon }: { label: string, value: number, color: string, icon: string }) => (
        <View style={styles.macroItem}>
            <View style={[styles.macroIconContainer, { backgroundColor: color + '15' }]}>
                <Ionicons name={icon as any} size={20} color={color} />
            </View>
            <View style={styles.macroTextContainer}>
                <Text style={styles.macroValue}>{value}g</Text>
                <Text style={styles.macroLabel}>{label}</Text>
            </View>
        </View>
    );

    return (
        <ScreenWrapper style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#2D3436" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Details</Text>
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={24} color="#2D3436" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.gaugeContainer}>
                    <CircularProgress
                        size={200}
                        strokeWidth={15}
                        progress={0.7} // Visual placeholder
                        color={Colors.primary}
                        backgroundColor="#F1F2F6"
                    />
                    <View style={styles.gaugeLabelContainer}>
                        <Text style={styles.gaugeValue}>{currentCal}</Text>
                        <Text style={styles.gaugeText}>kcal</Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.foodName}>{name}</Text>
                    <Text style={styles.portionInfo}>{quantity} {unit} contains:</Text>

                    <View style={styles.macrosGrid}>
                        <MacroItem label="Protein" value={currentProtein} color="#A29BFE" icon="nutrition-outline" />
                        <MacroItem label="Carbs" value={currentCarbs} color="#FFEAA7" icon="leaf-outline" />
                        <MacroItem label="Fats" value={currentFat} color="#FAB1A0" icon="water-outline" />
                        <MacroItem label="Fiber" value={0.5} color="#55EFC4" icon="fitness-outline" />
                    </View>
                </View>

                <View style={styles.quantitySection}>
                    <Text style={styles.sectionTitle}>Amount</Text>
                    <View style={styles.quantityCard}>
                        <TouchableOpacity
                            style={styles.quantityBtn}
                            onPress={() => setQuantity(Math.max(0.5, quantity - 0.5))}
                        >
                            <Ionicons name="remove" size={24} color={Colors.primary} />
                        </TouchableOpacity>

                        <View style={styles.quantityDisplay}>
                            <Text style={styles.quantityValue}>{quantity}</Text>
                            <Text style={styles.quantityUnit}>{unit}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.quantityBtn}
                            onPress={() => setQuantity(quantity + 0.5)}
                        >
                            <Ionicons name="add" size={24} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.unitList}>
                        {['Serving', '100g', 'Gram', 'Oz', 'Cup'].map(u => (
                            <TouchableOpacity
                                key={u}
                                style={[styles.unitChip, unit === u && styles.activeUnitChip]}
                                onPress={() => setUnit(u)}
                            >
                                <Text style={[styles.unitChipText, unit === u && styles.activeUnitChipText]}>{u}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title={`Log ${currentCal}kcal to Diary`}
                    onPress={handleAddFood}
                    style={styles.logButton}
                    textStyle={styles.logButtonText}
                />
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    content: {
        paddingHorizontal: 20,
    },
    gaugeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
    },
    gaugeLabelContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    gaugeValue: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    gaugeText: {
        fontSize: 18,
        color: '#B2BEC3',
        fontWeight: '600',
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 25,
        borderWidth: 1,
        borderColor: '#F1F2F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
        marginBottom: 30,
    },
    foodName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3436',
        marginBottom: 5,
    },
    portionInfo: {
        fontSize: 14,
        color: '#B2BEC3',
        marginBottom: 25,
    },
    macrosGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 15,
    },
    macroItem: {
        width: '45%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    macroIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    macroTextContainer: {
        flex: 1,
    },
    macroValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    macroLabel: {
        fontSize: 12,
        color: '#B2BEC3',
    },
    quantitySection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3436',
        marginBottom: 15,
    },
    quantityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F7F8FA',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
    },
    quantityBtn: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    quantityDisplay: {
        alignItems: 'center',
    },
    quantityValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    quantityUnit: {
        fontSize: 12,
        color: '#B2BEC3',
        fontWeight: '600',
    },
    unitList: {
        flexDirection: 'row',
    },
    unitChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        backgroundColor: '#F1F2F6',
        marginRight: 10,
    },
    activeUnitChip: {
        backgroundColor: Colors.primary,
    },
    unitChipText: {
        fontSize: 14,
        color: '#636E72',
        fontWeight: '600',
    },
    activeUnitChipText: {
        color: '#FFFFFF',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F7F8FA',
    },
    logButton: {
        backgroundColor: Colors.primary,
        borderRadius: 18,
        height: 56,
    },
    logButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
