import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Pressable,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 700 });
    translateY.value = withTiming(0, { duration: 700 });
  }, [opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleLogin = async () => {
    console.log("Running");
    if (!email || !password) {
      Alert.alert("Error", "All fields are required");

      return;
    }

    try {
      const res = await fetch(
        "https://smart-task-manager-tcyz.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();
      console.log("hello", data);
      console.log("Full response data:", JSON.stringify(data));

      if (!res.ok) {
        Alert.alert("Login Failed", data.message);
        return;
      }

      console.log("JWT Token:", data.token);

      console.log("working");

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("username", data.username);

      await login(data.token);
      router.replace("/(tabs)");

      Alert.alert("Success", "Login successful");
    } catch (err) {
      // console.log(err.message);
      Alert.alert("Error", "Server not reachable");
    }
  };

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPressIn={() => (scale.value = withSpring(0.95))}
          onPressOut={() => (scale.value = withSpring(1))}
          onPress={handleLogin}
        >
          <Animated.View style={[styles.button, buttonStyle]}>
            <Text style={styles.buttonText}>Login</Text>
          </Animated.View>
        </TouchableOpacity>
        <View style={styles.signup}>
          <Text style={styles.text}>Dont have an account? </Text>
          <Pressable onPress={() => router.replace("/(auth)/signup")}>
            <Text style={styles.link}>Sign Up</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.88,
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 18,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 22,
  },
  input: {
    backgroundColor: "#334155",
    color: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#6366f1",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  signup: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
  },
  text: { color: "#cbd5f5" },
  link: { color: "#60a5fa", fontWeight: "600" },
});
