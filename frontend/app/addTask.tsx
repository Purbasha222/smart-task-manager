// import { View, TextInput, TouchableOpacity, Alert } from "react-native";
// import React, { useState } from "react";
// import { useTheme } from "@/hooks/useTheme";
// import { createHomeStyles } from "@/assets/images/styles/home.styles";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { addTask } from "@/api/taskAPI";
// import { router } from "expo-router";

// export default function AddTodo() {
//   const { colors } = useTheme();
//   const homeStyles = createHomeStyles(colors);

//   const [newTodo, setNewTodo] = useState("");

//   const handleAddTodo = async () => {
//     if (!newTodo.trim()) return;

//     try {
//       await addTask({ title: newTodo.trim() });

//       setNewTodo("");

//       Alert.alert("Success", "Task added successfully");

//       // go back to home screen
//       router.back();
//     } catch (error) {
//       Alert.alert("Error", "Failed to add todo");
//     }
//   };

//   return (
//     <LinearGradient
//       colors={colors.gradients.background}
//       style={homeStyles.container}
//     >
//       <View style={homeStyles.inputSection}>
//         <View style={homeStyles.inputWrapper}>
//           <TextInput
//             style={homeStyles.input}
//             placeholder="What needs to be done?"
//             value={newTodo}
//             onChangeText={setNewTodo}
//             onSubmitEditing={handleAddTodo}
//             placeholderTextColor={colors.textMuted}
//           />

//           {/* <TouchableOpacity
//             onPress={handleAddTodo}
//             activeOpacity={0.8}
//             disabled={!newTodo.trim()}
//           >
//             <LinearGradient
//               colors={
//                 newTodo.trim()
//                   ? colors.gradients.primary
//                   : colors.gradients.muted
//               }
//               style={[
//                 homeStyles.addButton,
//                 !newTodo.trim() && homeStyles.addButtonDisabled,
//               ]}
//             >
//               <Ionicons name="add" size={24} color="#ffffff" />
//             </LinearGradient>
//           </TouchableOpacity> */}
//         </View>
//       </View>
//     </LinearGradient>
//   );
// }

// import { View, TextInput, TouchableOpacity, Alert, Text } from "react-native";
// import React, { useState } from "react";
// import { useTheme } from "@/hooks/useTheme";
// import { createHomeStyles } from "@/assets/images/styles/home.styles";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { addTask } from "@/api/taskAPI";
// import { router } from "expo-router";

// export default function AddTodo() {
//   const { colors } = useTheme();
//   const homeStyles = createHomeStyles(colors);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleAddTodo = async () => {
//     if (!title.trim()) {
//       Alert.alert("Validation", "Title is required");
//       return;
//     }

//     try {
//       await addTask({
//         title: title.trim(),
//         description: description.trim(),
//       });

//       setTitle("");
//       setDescription("");

//       Alert.alert("Success", "Task added successfully");

//       router.back();
//     } catch (error) {
//       Alert.alert("Error", "Failed to add todo");
//     }
//   };

//   return (
//     <LinearGradient
//       colors={colors.gradients.background}
//       style={[homeStyles.container, { justifyContent: "center" }]}
//     >
//       <View
//         style={{
//           padding: 20,
//           gap: 20,
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 22,
//             fontWeight: "bold",
//             color: colors.text,
//             textAlign: "center",
//           }}
//         >
//           Add New Task
//         </Text>

//         {/* Title Input */}
//         <TextInput
//           style={[homeStyles.inputSection, homeStyles.input]}
//           placeholder="Task title"
//           value={title}
//           onChangeText={setTitle}
//           placeholderTextColor={colors.textMuted}
//         />

//         {/* Description Input */}
//         <TextInput
//           style={[
//             homeStyles.inputSection,
//             homeStyles.input,
//             {
//               height: 100,
//               textAlignVertical: "top",
//             },
//           ]}
//           placeholder="Task description"
//           value={description}
//           onChangeText={setDescription}
//           multiline
//           placeholderTextColor={colors.textMuted}
//         />

//         {/* Add Button */}
//         <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8}>
//           <LinearGradient
//             colors={colors.gradients.primary}
//             style={{
//               padding: 16,
//               borderRadius: 12,
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: 8,
//             }}
//           >
//             <Ionicons name="add" size={22} color="#fff" />
//             <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
//               Add Task
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </LinearGradient>
//   );
// }

// claude ai

import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { addTask } from "@/api/taskAPI";
import { router } from "expo-router";

export default function AddTodo() {
  const { colors } = useTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Title is required");
      return;
    }

    try {
      await addTask({
        title: title.trim(),
        description: description.trim(),
      });

      setTitle("");
      setDescription("");
      Alert.alert("Success", "Task added successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to add todo");
    }
  };

  const styles = StyleSheet.create({
    input: {
      borderWidth: 2,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 16,
      fontSize: 17,
      fontWeight: "500",
      backgroundColor: colors.backgrounds.input,
      borderColor: colors.border,
      color: colors.text, // ✅ text always visible
    },
  });

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <View style={{ padding: 20, gap: 20 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: colors.text,
            textAlign: "center",
          }}
        >
          Add New Task
        </Text>

        {/* Title Input */}
        <TextInput
          style={styles.input} // ✅ no flex:1, no conflicting padding
          placeholder="Task title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={colors.textMuted}
        />

        {/* Description Input */}
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder="Task description"
          value={description}
          onChangeText={setDescription}
          multiline
          placeholderTextColor={colors.textMuted}
        />

        {/* Add Button */}
        <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={{
              padding: 16,
              borderRadius: 12,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Ionicons name="add" size={22} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Add Task
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
