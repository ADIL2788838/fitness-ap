import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { Colors } from '../../src/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const mockFoods = [
    { id: '1', name: 'Banana', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, portion: '1 medium' },
    { id: '2', name: 'Chicken Breast (Grilled)', calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: '100g' },
    { id: '3', name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 3, portion: '1 cup cooked' },
    { id: '4', name: 'Egg (Large)', calories: 78, protein: 6, carbs: 0.6, fat: 5, portion: '1 large' },
    { id: '5', name: 'Rice (White, Cooked)', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, portion: '100g' },
    { id: '6', name: 'Avocado', calories: 160, protein: 2, carbs: 8.5, fat: 15, portion: '1/2 medium' },
];

export default function SearchScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const mealName = params.mealName || 'Log Food';

    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Recent');

    const filteredFoods = mockFoods.filter(food =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderFoodItem = ({ item }: { item: typeof mockFoods[0] }) => (
        <TouchableOpacity
            style={styles.foodItem}
            onPress={() => router.push({
                pathname: '/food/details',
                params: {
                    id: item.id,
                    name: item.name,
                    calories: item.calories,
                    protein: item.protein,
                    carbs: item.carbs,
                    fat: item.fat
                }
            })}
        >
            <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodDetails}>{item.calories} kcal • {item.portion}</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={20} color={Colors.white} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper style={styles.screen}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={28} color="#2D3436" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{mealName}</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color={Colors.textLight} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search 1M+ Foods"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor="#B2BEC3"
                        />
                        <TouchableOpacity style={styles.barcodeButton}>
                            <Ionicons name="barcode-outline" size={24} color="#2D3436" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.tabsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
                    {['Recent', 'Frequent', 'My Foods', 'Recipes'].map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredFoods}
                renderItem={renderFoodItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="search-outline" size={60} color="#DFE6E9" />
                        <Text style={styles.emptyText}>No foods found matching "{searchQuery}"</Text>
                    </View>
                }
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 10,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    searchBarContainer: {
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F2F6',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 50,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#2D3436',
    },
    barcodeButton: {
        padding: 5,
    },
    tabsContainer: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F7F8FA',
    },
    tabsScroll: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 20,
        backgroundColor: '#F1F2F6',
        marginRight: 10,
    },
    activeTab: {
        backgroundColor: '#E1F8F1', // Light version of the primary color
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    tabText: {
        fontSize: 14,
        color: '#636E72',
        fontWeight: '600',
    },
    activeTabText: {
        color: Colors.primary,
    },
    list: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    foodItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F7F8FA',
    },
    foodInfo: {
        flex: 1,
    },
    foodName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3436',
        marginBottom: 4,
    },
    foodDetails: {
        fontSize: 14,
        color: '#B2BEC3',
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyState: {
        padding: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: '#B2BEC3',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 15,
    },
});
