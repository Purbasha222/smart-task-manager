import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Tabs } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

const TabsLayout = () => {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 110,
          paddingBottom: 40,
          paddingTop: 10,
        },
        tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash-outline" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
