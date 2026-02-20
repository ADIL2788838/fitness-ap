import React, { createContext, useContext, useState, ReactNode } from 'react';

type Goal = 'Lose Weight' | 'Maintain Weight' | 'Gain Muscle' | null;
type Gender = 'Male' | 'Female' | null;
type ActivityLevel = 'Sedentary' | 'Lightly Active' | 'Active' | 'Very Active' | null;
type Speed = 'Slow' | 'Moderate' | 'Aggressive' | null;

interface OnboardingData {
    goal: Goal;
    gender: Gender;
    age: string;
    height: string;
    currentWeight: string;
    activityLevel: ActivityLevel;
    targetWeight: string;
    speed: Speed;
}

interface OnboardingContextType {
    data: OnboardingData;
    updateData: (key: keyof OnboardingData, value: any) => void;
    resetData: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<OnboardingData>({
        goal: null,
        gender: null,
        age: '',
        height: '',
        currentWeight: '',
        activityLevel: null,
        targetWeight: '',
        speed: null,
    });

    const updateData = (key: keyof OnboardingData, value: any) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const resetData = () => {
        setData({
            goal: null,
            gender: null,
            age: '',
            height: '',
            currentWeight: '',
            activityLevel: null,
            targetWeight: '',
            speed: null,
        });
    };

    return (
        <OnboardingContext.Provider value={{ data, updateData, resetData }}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
};
