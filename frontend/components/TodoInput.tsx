import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/images/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { addTask } from "@/api/taskAPI";

const TodoInput = ({ fetch }: { fetch: () => void }) => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await addTask({ title: newTodo.trim() });
        setNewTodo("");
        fetch();
      } catch (error) {
        Alert.alert("Error", "Failed to add todo");
      }
    }
  };

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          style={homeStyles.input}
          placeholder="What needs to be done?"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
          <LinearGradient
            colors={
              newTodo.trim() ? colors.gradients.primary : colors.gradients.muted
            }
            style={[
              homeStyles.addButton,
              !newTodo.trim() && homeStyles.addButtonDisabled,
            ]}
          >
            <Ionicons name="add" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;

// chatgpt code

// import { View, TextInput, TouchableOpacity, Alert } from "react-native";
// import React, { useState } from "react";
// import { useTheme } from "@/hooks/useTheme";
// import { createHomeStyles } from "@/assets/images/styles/home.styles";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { addTask } from "@/api/taskAPI";

// /* 🔹 CHANGE 1: accept callback prop */
// type TodoInputProps = {
//   onTaskAdded: () => void;
// };

// const TodoInput = ({ onTaskAdded }: TodoInputProps) => {
//   const { colors } = useTheme();
//   const homeStyles = createHomeStyles(colors);

//   const [newTodo, setNewTodo] = useState("");

//   const handleAddTodo = async () => {
//     if (newTodo.trim()) {
//       try {
//         await addTask({ title: newTodo.trim() });
//         setNewTodo("");

//         /* 🔹 CHANGE 2: notify parent to refetch tasks */
//         onTaskAdded();
//       } catch (error) {
//         Alert.alert("Error", "Failed to add todo");
//       }
//     }
//   };

//   return (
//     <View style={homeStyles.inputSection}>
//       <View style={homeStyles.inputWrapper}>
//         <TextInput
//           style={homeStyles.input}
//           placeholder="What needs to be done?"
//           value={newTodo}
//           onChangeText={setNewTodo}
//           onSubmitEditing={handleAddTodo}
//           placeholderTextColor={colors.textMuted}
//         />
//         <TouchableOpacity
//           onPress={handleAddTodo}
//           activeOpacity={0.8}
//           disabled={!newTodo.trim()}
//         >
//           <LinearGradient
//             colors={
//               newTodo.trim() ? colors.gradients.primary : colors.gradients.muted
//             }
//             style={[
//               homeStyles.addButton,
//               !newTodo.trim() && homeStyles.addButtonDisabled,
//             ]}
//           >
//             <Ionicons name="add" size={24} color="#ffffff" />
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default TodoInput;
