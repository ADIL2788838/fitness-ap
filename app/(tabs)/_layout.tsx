import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/Colors';
import { Platform, View } from 'react-native';
import React, { useState } from 'react';
import LogModal from '../../src/components/LogModal';

export default function TabLayout() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: Colors.white,
                        borderTopWidth: 0,
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: -2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        height: Platform.OS === 'ios' ? 88 : 65,
                        paddingBottom: Platform.OS === 'ios' ? 28 : 10,
                        paddingTop: 8,
                    },
                    tabBarActiveTintColor: '#00B894',
                    tabBarInactiveTintColor: Colors.textLight,
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontWeight: '500',
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="progress"
                    options={{
                        title: 'Progress',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="pie-chart-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="fab_placeholder"
                    options={{
                        title: '',
                        tabBarIcon: ({ color, size }) => (
                            <View style={{
                                width: 56,
                                height: 56,
                                borderRadius: 28,
                                backgroundColor: '#00B894',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 20,
                                elevation: 8,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 4.65,
                            }}>
                                <Ionicons name="add" size={36} color={Colors.white} />
                            </View>
                        ),
                    }}
                    listeners={{
                        tabPress: (e) => {
                            e.preventDefault();
                            setModalVisible(true);
                        },
                    }}
                />
                <Tabs.Screen
                    name="community"
                    options={{
                        title: 'Community',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="git-compare-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person-outline" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
            <LogModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </>
    );
}
