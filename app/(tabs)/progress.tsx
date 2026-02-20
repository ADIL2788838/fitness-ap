import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { Colors } from '../../src/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from '../../src/components/LineChart';

const { width } = Dimensions.get('window');

const AchievementBadge = ({ label, icon, color, level }: { label: string, icon: string, color: string, level: number }) => (
    <View style={styles.badgeContainer}>
        <View style={[styles.badgeCircle, { borderColor: color }]}>
            <Ionicons name={icon as any} size={32} color={color} />
            <View style={[styles.levelTag, { backgroundColor: color }]}>
                <Text style={styles.levelText}>lvl {level}</Text>
            </View>
        </View>
        <Text style={styles.badgeLabel}>{label}</Text>
    </View>
);

const SummaryCard = ({ date, status, weight, calories, target }: { date: string, status: string, weight: string, calories: number, target: number }) => (
    <TouchableOpacity style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
            <Text style={styles.summaryDate}>{date}</Text>
            <View style={styles.statusBadge}>
                <Ionicons name="checkmark-circle" size={18} color="#00B894" />
                <Text style={styles.statusText}>{status}</Text>
            </View>
        </View>
        <Text style={styles.summaryDetail}>Weight: {weight}</Text>
        <Text style={styles.summaryDetail}>Calories consumed: {calories} / {target} cals</Text>
    </TouchableOpacity>
);

export default function ProgressScreen() {
    const [activeTab, setActiveTab] = useState('Diary');

    const weightData = [152, 151.5, 150.8, 151, 150.2, 150, 149.8];
    const weightLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const renderContent = () => {
        if (activeTab === 'Diary') {
            return (
                <>
                    {/* Achievements Card */}
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>My Achievements</Text>
                            <Text style={styles.sectionSubtitle}>Level-up in each category to earn gems & rewards.</Text>
                        </View>
                        <View style={styles.badgesList}>
                            <AchievementBadge label="Food" icon="nutrition" color="#A29BFE" level={1} />
                            <AchievementBadge label="Exercise" icon="barbell" color="#EF5350" level={1} />
                            <AchievementBadge label="Weight" icon="speedometer" color="#42A5F5" level={1} />
                        </View>

                        <View style={styles.statsRow}>
                            <View style={styles.statBox}>
                                <View style={styles.statIconContainer}>
                                    <Ionicons name="flame" size={24} color="#EF5350" />
                                    <Text style={styles.statValue}>1</Text>
                                </View>
                                <Text style={styles.statLabel}>Day streak</Text>
                            </View>
                            <View style={styles.statBox}>
                                <View style={styles.statIconContainer}>
                                    <Ionicons name="flash" size={24} color="#FD9644" />
                                    <Text style={styles.statValue}>1</Text>
                                </View>
                                <Text style={styles.statLabel}>Active days</Text>
                            </View>
                        </View>
                    </View>

                    {/* Daily Summaries */}
                    <Text style={styles.listTitle}>Daily Summaries</Text>
                    <SummaryCard
                        date="Thu, Feb 19"
                        status="On Track"
                        weight="150 lbs"
                        calories={0}
                        target={1866}
                    />
                </>
            );
        } else {
            return (
                <View style={styles.progressSection}>
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionTitle}>Weight Progress</Text>
                        <Text style={styles.sectionSubtitle}>Last 7 days</Text>
                        <View style={styles.chartContainer}>
                            <LineChart
                                data={weightData}
                                labels={weightLabels}
                                color={Colors.primary}
                                width={width - 70}
                            />
                        </View>
                    </View>
                </View>
            );
        }
    };

    return (
        <ScreenWrapper style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Progress</Text>
                <TouchableOpacity style={styles.gemsContainer}>
                    <Text style={styles.gemsCount}>0</Text>
                    <Ionicons name="diamond" size={20} color="#00B894" />
                </TouchableOpacity>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Diary' && styles.activeTab]}
                    onPress={() => setActiveTab('Diary')}
                >
                    <Text style={[styles.tabText, activeTab === 'Diary' && styles.activeTabText]}>Diary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Progress' && styles.activeTab]}
                    onPress={() => setActiveTab('Progress')}
                >
                    <Text style={[styles.tabText, activeTab === 'Progress' && styles.activeTabText]}>Progress</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {renderContent()}
                <View style={{ height: 40 }} />
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    gemsContainer: {
        position: 'absolute',
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    gemsCount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00B894',
        marginRight: 5,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F1F2F6',
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical: 15,
        padding: 5,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    activeTab: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tabText: {
        fontSize: 16,
        color: '#B2BEC3',
        fontWeight: 'bold',
    },
    activeTabText: {
        color: '#2D3436',
    },
    sectionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F1F2F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    sectionHeader: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3436',
        marginBottom: 5,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#B2BEC3',
        lineHeight: 20,
    },
    badgesList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    badgeContainer: {
        alignItems: 'center',
    },
    badgeCircle: {
        width: 76,
        height: 76,
        borderRadius: 38,
        borderWidth: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#F7F8FA',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    levelTag: {
        position: 'absolute',
        bottom: -2,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
    },
    levelText: {
        fontSize: 10,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    badgeLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#F7F8FA',
        paddingTop: 20,
    },
    statBox: {
        flex: 1,
        padding: 12,
        backgroundColor: '#F7F8FA',
        borderRadius: 15,
        marginHorizontal: 5,
    },
    statIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    statValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2D3436',
        marginLeft: 10,
    },
    statLabel: {
        fontSize: 12,
        color: '#B2BEC3',
        fontWeight: '600',
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3436',
        marginBottom: 15,
        marginLeft: 5,
    },
    summaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F1F2F6',
    },
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    summaryDate: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E1F8F1',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    statusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#00B894',
        marginLeft: 4,
    },
    summaryDetail: {
        fontSize: 15,
        color: '#636E72',
        marginBottom: 6,
    },
    progressSection: {
        marginTop: 5,
    },
    chartContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});
