import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { OnboardingProvider } from '../src/context/OnboardingContext';

export default function Layout() {
    return (
        <OnboardingProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F9FAFB' } }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="onboarding/goal" />
                <Stack.Screen name="onboarding/personal-info" />
                <Stack.Screen name="onboarding/activity" />
                <Stack.Screen name="onboarding/target" />
                <Stack.Screen name="onboarding/signup" />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="food/search" options={{ presentation: 'modal', title: 'Search Food', headerShown: false }} />
                <Stack.Screen name="food/details" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name="recipes/details" options={{ presentation: 'card', headerShown: false }} />
            </Stack>
        </OnboardingProvider>
    );
}
