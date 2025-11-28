import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { ChefsScreen } from '../screens/ChefsScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { ItemDetailScreen } from '../screens/ItemDetailScreen';
import { colors } from '../theme/colors';
import { MenuItem } from '../api/types';

// Define types for navigation
export type RootStackParamList = {
    MainTabs: undefined;
    ItemDetail: { item: MenuItem };
};

export type MainTabParamList = {
    Home: undefined;
    Menu: undefined;
    Chefs: undefined;
    Contact: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.border,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Menu') {
                        iconName = focused ? 'restaurant' : 'restaurant-outline';
                    } else if (route.name === 'Chefs') {
                        iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === 'Contact') {
                        iconName = focused ? 'map' : 'map-outline';
                    } else {
                        iconName = 'help';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Menu" component={MenuScreen} />
            <Tab.Screen name="Chefs" component={ChefsScreen} />
            <Tab.Screen name="Contact" component={ContactScreen} />
        </Tab.Navigator>
    );
};

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerTintColor: colors.text,
                    headerTitleStyle: {
                        color: colors.text,
                    },
                }}
            >
                <Stack.Screen
                    name="MainTabs"
                    component={MainTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ItemDetail"
                    component={ItemDetailScreen}
                    options={{ title: 'Dish Details' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
