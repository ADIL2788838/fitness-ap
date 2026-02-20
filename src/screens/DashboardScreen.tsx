import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Colors } from '../constants/Colors';
import { CircularProgress } from '../components/CircularProgress';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const MacroMeter = ({ label, left, total, color }: { label: string, left: number, total: number, color: string }) => {
    const progress = Math.max(0, Math.min(1 - (left / total), 1));
    return (
        <View style={styles.macroMeterContainer}>
            <View style={styles.macroHeader}>
                <Text style={styles.macroLabel}>{label.toUpperCase()}</Text>
            </View>
            <View style={styles.macroBarContainer}>
                <View style={[styles.macroBarBackground, { backgroundColor: color + '20' }]}>
                    <View style={[styles.macroBarFill, { width: `${progress * 100}%`, backgroundColor: color }]} />
                </View>
                <Text style={styles.macroValue}>{left}g left</Text>
            </View>
        </View>
    );
};

export default function DashboardScreen() {
    const router = useRouter();

    return (
        <ScreenWrapper style={styles.screen}>
            <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
                {/* Header Gradient Section */}
                <LinearGradient
                    colors={['#00B894', '#009473']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.headerGradient}
                >
                    <View style={styles.profileSection}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>₪</Text>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.username}>t5516644</Text>
                            <Text style={styles.userGoals}>Gain weight | Balanced Diet</Text>
                        </View>
                        <TouchableOpacity style={styles.notificationBtn}>
                            <Ionicons name="notifications-outline" size={24} color={Colors.white} />
                        </TouchableOpacity>
                    </View>

                    {/* Weight Card */}
                    <View style={styles.weightCard}>
                        <View style={styles.weightStat}>
                            <Text style={styles.weightLabel}>WEIGHT</Text>
                            <Text style={styles.weightValue}>150 lbs</Text>
                        </View>
                        <View style={styles.weightStat}>
                            <Text style={styles.weightLabel}>TARGET</Text>
                            <Text style={styles.weightValue}>155 lbs</Text>
                        </View>
                        <TouchableOpacity style={styles.fitScoreContainer}>
                            <Text style={styles.fitScoreText}>FITSCORE: 71</Text>
                            <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {/* Date Navigation */}
                <View style={styles.dateNav}>
                    <TouchableOpacity style={styles.navBtn}>
                        <Ionicons name="chevron-back" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                    <View style={styles.dateDisplay}>
                        <Ionicons name="calendar" size={20} color={Colors.primary} />
                        <Text style={styles.dateText}>Today</Text>
                    </View>
                    <TouchableOpacity style={styles.navBtn}>
                        <Ionicons name="chevron-forward" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Calorie Section */}
                <View style={styles.calorieCard}>
                    <View style={styles.calorieSection}>
                        <View style={styles.circleContainer}>
                            <CircularProgress
                                size={150}
                                strokeWidth={10}
                                progress={0.65}
                                color={Colors.primary}
                                backgroundColor="#F1F2F6"
                                showText={true}
                                text="1866"
                                subText="CALS LEFT"
                            />
                        </View>

                        <View style={styles.macrosList}>
                            <MacroMeter label="Carb" left={280} total={350} color="#FD9644" />
                            <MacroMeter label="Protein" left={70} total={150} color="#2BCBBA" />
                            <MacroMeter label="Fat" left={52} total={80} color="#F1C40F" />
                        </View>
                    </View>
                </View>

                {/* Banner Button */}
                <TouchableOpacity style={styles.bannerButton} activeOpacity={0.9}>
                    <LinearGradient
                        colors={['#FFF9E3', '#FEF5D1']}
                        style={styles.bannerGradient}
                    >
                        <View style={styles.bannerIcon}>
                            <Ionicons name="restaurant" size={24} color="#D6A01E" />
                        </View>
                        <Text style={styles.bannerText}>What should I eat?</Text>
                        <Ionicons name="chevron-forward" size={20} color="#D6A01E" style={{ marginLeft: 'auto' }} />
                    </LinearGradient>
                </TouchableOpacity>

                {/* Foods Section Title */}
                <View style={styles.foodsHeader}>
                    <Text style={styles.foodsTitle}>FOODS</Text>
                    <View style={styles.foodsUnderline} />
                </View>

                {/* Empty State / Illustration */}
                <View style={styles.illustrationContainer}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png' }}
                        style={styles.illustration}
                    />
                    <Text style={styles.emptyTitle}>Your diary is empty</Text>
                    <Text style={styles.emptyDesc}>Tap the + button to log your first meal!</Text>
                </View>

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
    },
    headerGradient: {
        paddingTop: 60,
        paddingBottom: 70,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    avatarText: {
        fontSize: 28,
        color: '#00B894',
        fontWeight: 'bold',
    },
    userInfo: {
        marginLeft: 15,
        flex: 1,
    },
    username: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    userGoals: {
        color: '#FFFFFFB0',
        fontSize: 13,
        marginTop: 2,
    },
    notificationBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    weightCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 10,
        position: 'absolute',
        bottom: -35,
        left: 20,
        right: 20,
    },
    weightStat: {
        alignItems: 'center',
    },
    weightLabel: {
        fontSize: 10,
        color: '#B2BEC3',
        fontWeight: 'bold',
        marginBottom: 6,
        letterSpacing: 1,
    },
    weightValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    fitScoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E1F8F1',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    fitScoreText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#00B894',
        marginRight: 4,
    },
    dateNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 60,
        paddingHorizontal: 20,
    },
    navBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F7F8FA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F1F2F6',
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D3436',
        marginLeft: 10,
    },
    calorieCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 30,
        borderRadius: 25,
        padding: 20,
        borderWidth: 1,
        borderColor: '#F7F8FA',
    },
    calorieSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circleContainer: {
        flex: 1.2,
        alignItems: 'center',
    },
    macrosList: {
        flex: 1,
        paddingLeft: 10,
    },
    macroMeterContainer: {
        marginBottom: 15,
    },
    macroHeader: {
        marginBottom: 6,
    },
    macroLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#B2BEC3',
        letterSpacing: 0.5,
    },
    macroBarContainer: {
        flexDirection: 'column',
    },
    macroBarBackground: {
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
        width: '100%',
    },
    macroBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    macroValue: {
        fontSize: 12,
        color: '#636E72',
        marginTop: 4,
        fontWeight: '600',
    },
    bannerButton: {
        marginHorizontal: 20,
        marginTop: 30,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#D6A01E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    bannerGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
    },
    bannerIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#846A28',
        marginLeft: 15,
    },
    foodsHeader: {
        alignItems: 'center',
        marginTop: 40,
    },
    foodsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#B2BEC3',
        letterSpacing: 2,
    },
    foodsUnderline: {
        width: 24,
        height: 3,
        backgroundColor: '#00B894',
        marginTop: 8,
        borderRadius: 2,
    },
    illustrationContainer: {
        alignItems: 'center',
        marginTop: 30,
        paddingBottom: 60,
    },
    illustration: {
        width: 180,
        height: 140,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3436',
        marginBottom: 8,
    },
    emptyDesc: {
        fontSize: 14,
        color: '#B2BEC3',
        textAlign: 'center',
        paddingHorizontal: 40,
        lineHeight: 20,
    },
});
