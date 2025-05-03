import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { HugeiconsIcon } from '@hugeicons/react-native';

import { AnalyticsUpFreeIcons, Home11FreeIcons, SpoonAndKnifeFreeIcons, User02FreeIcons } from '@hugeicons/core-free-icons';
import Colors from '../../components/ui/Colors';


export default function _layout() {
  return (
    <Tabs screenOptions={{
        headerShown:false,
        contentStyle: { backgroundColor: "white" },
        tabBarActiveTintColor: Colors.PRIMARY, // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
        }}>
        
        <Tabs.Screen name='Home' options={{
            tabBarIcon: ({ color, size }) => (
                <HugeiconsIcon
                icon={Home11FreeIcons}
                size={size}
                color={color}
                strokeWidth={1.5}
              />
            )
        }}/>
        <Tabs.Screen name='Meals' options={{
            tabBarIcon: ({ color, size }) => (
                <HugeiconsIcon
                icon={SpoonAndKnifeFreeIcons}
                size={size}
                color={color}
                strokeWidth={1.5}
              />
            )
        }}/>
        <Tabs.Screen name='Progress' options={{
            tabBarIcon: ({ color, size }) => (
                <HugeiconsIcon
                icon={AnalyticsUpFreeIcons}
                size={size}
                color={color}
                strokeWidth={1.5}
              />
            )
        }}/>
        <Tabs.Screen name='Profile' options={{
            tabBarIcon: ({ color, size }) => (
                <HugeiconsIcon
                icon={User02FreeIcons}
                size={size}
                color={color}
                strokeWidth={1.5}
              />
            )
        }}/>
    </Tabs>
  )
}