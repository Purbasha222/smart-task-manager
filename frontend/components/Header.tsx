import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/images/styles/home.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUsername = async () => {
      const name = await AsyncStorage.getItem("username");
      if (name) setUsername(name);
    };
    getUsername();
  }, []);

  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyles.iconContainer}
        >
          <Ionicons name="flash-outline" size={24} color="#ffffff" />
        </LinearGradient>
        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>NexTask</Text>
          <Text style={homeStyles.subtitle}>Hello {username}! 👋</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
