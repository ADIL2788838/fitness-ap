import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { Colors } from '../../src/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const FeedItem = ({ username, time, likes, comments }: { username: string, time: string, likes: number, comments: number }) => (
    <View style={styles.feedItem}>
        <View style={styles.feedHeader}>
            <View style={styles.userInfo}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>₪</Text>
                </View>
                <Text style={styles.usernameText}>{username}</Text>
            </View>
            <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={20} color="#B2BEC3" />
            </TouchableOpacity>
        </View>

        <View style={styles.feedContentPlaceholder}>
            <View style={styles.placeholderBox}>
                <Ionicons name="image-outline" size={40} color="#DFE6E9" />
            </View>
        </View>

        <View style={styles.feedFooter}>
            <Text style={styles.timeText}>{time}</Text>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="heart-outline" size={24} color="#636E72" />
                    <Text style={styles.actionText}>{likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbubble-outline" size={24} color="#636E72" />
                    <Text style={styles.actionText}>{comments}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const RecipeCard = ({ title, calories, time, image, onPress }: { title: string, calories: number, time: string, image: string, onPress: () => void }) => (
    <TouchableOpacity style={styles.recipeCard} onPress={onPress}>
        <Image source={{ uri: image }} style={styles.recipeImage} />
        <View style={styles.recipeInfo}>
            <Text style={styles.recipeTitle} numberOfLines={2}>{title}</Text>
            <View style={styles.recipeMeta}>
                <View style={styles.metaItem}>
                    <Ionicons name="flame-outline" size={14} color={Colors.primary} />
                    <Text style={styles.metaText}>{calories} kcal</Text>
                </View>
                <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={14} color={Colors.textLight} />
                    <Text style={styles.metaText}>{time}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

export default function CommunityScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Feed');
    const tabs = ['Feed', 'Recipes', 'Food Ranks', 'Leaderboard'];

    const recipes = [
        {
            id: '1',
            title: 'Avocado Toast with Egg',
            calories: 320,
            time: '15 min',
            image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=300&auto=format&fit=crop'
        },
        {
            id: '2',
            title: 'Greek Yogurt Bowl',
            calories: 210,
            time: '5 min',
            image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=300&auto=format&fit=crop'
        },
        {
            id: '3',
            title: 'Quinoa Salad',
            calories: 450,
            time: '20 min',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop'
        },
        {
            id: '4',
            title: 'Grilled Salmon',
            calories: 520,
            time: '25 min',
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=300&auto=format&fit=crop'
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Feed':
                return (
                    <View>
                        <FeedItem username="k" time="35 mins ago" likes={0} comments={0} />
                        <FeedItem username="bardananamaria11.." time="1 day ago" likes={0} comments={0} />
                    </View>
                );
            case 'Recipes':
                return (
                    <View style={styles.recipeGrid}>
                        {recipes.map(recipe => (
                            <RecipeCard
                                key={recipe.id}
                                {...recipe}
                                onPress={() => router.push({
                                    pathname: '/recipes/details',
                                    params: {
                                        title: recipe.title,
                                        image: recipe.image,
                                        calories: recipe.calories,
                                        time: recipe.time
                                    }
                                })}
                            />
                        ))}
                    </View>
                );
            default:
                return (
                    <View style={styles.emptyState}>
                        <Ionicons name="construct-outline" size={60} color="#DFE6E9" />
                        <Text style={styles.emptyText}>{activeTab} coming soon!</Text>
                    </View>
                );
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="person-circle-outline" size={32} color="#2D3436" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Community</Text>
                <TouchableOpacity>
                    <Ionicons name="search" size={28} color="#2D3436" />
                </TouchableOpacity>
            </View>

            <View style={styles.tabScrollContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                            {activeTab === tab && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {renderContent()}
                <View style={{ height: 40 }} />
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    tabScrollContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F2F6',
    },
    tabsScroll: {
        paddingHorizontal: 15,
    },
    tab: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: 'center',
    },
    activeTab: {},
    tabText: {
        fontSize: 16,
        color: '#636E72',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#00B894',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        width: '60%',
        height: 3,
        backgroundColor: '#00B894',
        borderRadius: 2,
    },
    feedItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F2F6',
    },
    feedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F7F1E3',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00B894',
    },
    avatarText: {
        fontSize: 20,
        color: '#00B894',
        fontWeight: 'bold',
    },
    usernameText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3436',
        marginLeft: 10,
    },
    feedContentPlaceholder: {
        height: 150,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderBox: {
        alignItems: 'center',
    },
    feedFooter: {
        marginTop: 10,
    },
    timeText: {
        fontSize: 14,
        color: '#B2BEC3',
        marginBottom: 10,
    },
    actions: {
        flexDirection: 'row',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 25,
    },
    actionText: {
        fontSize: 14,
        color: '#636E72',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    recipeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        justifyContent: 'space-between',
    },
    recipeCard: {
        width: (width - 40) / 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    recipeImage: {
        width: '100%',
        height: 120,
    },
    recipeInfo: {
        padding: 12,
    },
    recipeTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2D3436',
        marginBottom: 8,
        height: 40,
    },
    recipeMeta: {
        flexDirection: 'column',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    metaText: {
        fontSize: 12,
        color: '#636E72',
        marginLeft: 4,
    },
    emptyState: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#B2BEC3',
        marginTop: 15,
    },
});
