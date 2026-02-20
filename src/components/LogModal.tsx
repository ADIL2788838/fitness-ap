import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const LogItem = ({ label, icon, color, onPress, size = 40 }: { label: string, icon: string, color: string, onPress: () => void, size?: number }) => (
    <TouchableOpacity style={styles.logItem} onPress={onPress}>
        <View style={styles.iconCircle}>
            <Ionicons name={icon as any} size={size} color={color} />
        </View>
        <Text style={styles.logLabel}>{label}</Text>
    </TouchableOpacity>
);

export default function LogModal({ visible, onClose }: { visible: boolean, onClose: () => void }) {
    const router = useRouter();

    const handleLogPress = (mealName: string) => {
        onClose();
        router.push({
            pathname: '/food/search',
            params: { mealName }
        });
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Today</Text>
                    <Text style={styles.subtitle}>log activities</Text>

                    <View style={styles.grid}>
                        {/* Meal Row */}
                        <View style={styles.row}>
                            <LogItem label="Breakfast" icon="egg" color="#00B894" onPress={() => handleLogPress('Breakfast')} />
                            <LogItem label="Lunch" icon="fish" color="#00B894" onPress={() => handleLogPress('Lunch')} />
                            <LogItem label="Dinner" icon="fast-food" color="#00B894" onPress={() => handleLogPress('Dinner')} />
                            <LogItem label="Snack" icon="ice-cream" color="#00B894" onPress={() => handleLogPress('Snack')} />
                        </View>

                        {/* Activity Row */}
                        <View style={styles.row}>
                            <LogItem label="Weight" icon="speedometer" color="#FD9644" onPress={() => handleLogPress('Weight')} />
                            <LogItem label="Exercise" icon="barbell" color="#EB4D4B" onPress={() => handleLogPress('Exercise')} />
                            <LogItem label="Water" icon="water" color="#0984E3" onPress={() => handleLogPress('Water')} />
                            <LogItem label="Post" icon="camera" color="#6C5CE7" onPress={() => handleLogPress('Post')} />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <View style={styles.closeCircle}>
                            <Ionicons name="close" size={32} color="#2D3436" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: width,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00B894',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#B2BEC3',
        marginBottom: 50,
    },
    grid: {
        width: '100%',
        gap: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    logItem: {
        alignItems: 'center',
        width: width / 4 - 20,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
    },
    logLabel: {
        fontSize: 14,
        color: '#2D3436',
        fontWeight: '500',
    },
    closeButton: {
        marginTop: 60,
    },
    closeCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#2D3436',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
