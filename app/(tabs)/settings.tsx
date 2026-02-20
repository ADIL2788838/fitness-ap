import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { Colors } from '../../src/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const SettingsItem = ({ icon, label, sublabel, hasSwitch, value, onToggle, showArrow = true }: any) => (
    <TouchableOpacity style={styles.settingsItem}>
        <View style={styles.itemLeft}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={24} color="#2D3436" />
            </View>
            <View style={styles.labelContainer}>
                <Text style={styles.itemLabel}>{label}</Text>
                {sublabel && <Text style={styles.itemSublabel}>{sublabel}</Text>}
            </View>
        </View>
        {hasSwitch ? (
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: '#DFE6E9', true: '#00B894' }}
                thumbColor="#FFFFFF"
            />
        ) : (
            showArrow && <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
        )}
    </TouchableOpacity>
);

export default function SettingsScreen() {
    const [countExercise, setCountExercise] = useState(true);
    const [useNetCarbs, setUseNetCarbs] = useState(false);

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>₪</Text>
                        </View>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.username}>t5516644</Text>
                        <Text style={styles.tapToEdit}>Tap to edit profile</Text>
                    </View>
                </View>

                {/* Settings List */}
                <View style={styles.settingsList}>
                    <SettingsItem icon="time-outline" label="Balanced Diet Plan" />
                    <SettingsItem icon="stats-chart-outline" label="Set Calorie Goals" />
                    <SettingsItem icon="swap-vertical-outline" label="Measurement Unit" />

                    <View style={styles.divider} />

                    <SettingsItem
                        icon="barbell-outline"
                        label="Count Exercise Calories"
                        sublabel="Adjust calorie goals based on exercise"
                        hasSwitch={true}
                        value={countExercise}
                        onToggle={setCountExercise}
                    />
                    <SettingsItem
                        icon="calculator-outline"
                        label="Use Net Carbs"
                        sublabel="Net Carbs = Total Carbs - Fiber"
                        hasSwitch={true}
                        value={useNetCarbs}
                        onToggle={setUseNetCarbs}
                    />

                    <View style={styles.divider} />

                    <SettingsItem icon="document-text-outline" label="How to use Oatsy" />
                    <SettingsItem icon="layers-outline" label="How to unsubscribe" />
                    <SettingsItem icon="help-circle-outline" label="Contact Support" />
                </View>

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
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 30,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F1F2F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: '#F1F2F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F7F1E3',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00B894',
    },
    avatarText: {
        fontSize: 30,
        color: '#00B894',
        fontWeight: 'bold',
    },
    profileInfo: {
        marginLeft: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    tapToEdit: {
        fontSize: 14,
        color: '#B2BEC3',
        marginTop: 5,
    },
    settingsList: {
        paddingHorizontal: 0,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F7F8FA',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 30,
        alignItems: 'center',
    },
    labelContainer: {
        marginLeft: 15,
        flex: 1,
    },
    itemLabel: {
        fontSize: 16,
        color: '#2D3436',
        fontWeight: '500',
    },
    itemSublabel: {
        fontSize: 10,
        color: '#B2BEC3',
        marginTop: 3,
    },
    divider: {
        height: 10,
        backgroundColor: '#F7F8FA',
        marginVertical: 5,
    },
});
