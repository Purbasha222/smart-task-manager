import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { updateTask } from "@/api/taskAPI";

export default function EditTask() {
  const { id, title, description } = useLocalSearchParams();

  const [newTitle, setNewTitle] = useState(title as string);
  const [newDescription, setNewDescription] = useState(description as string);

  const handleUpdate = async () => {
    if (newTitle === title && newDescription === description) {
      Alert.alert("No changes made");
      return;
    }
    try {
      await updateTask(id as string, {
        title: newTitle,
        description: newDescription,
      });

      Alert.alert("Success", "Task updated");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Update failed");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 20 }}>
      <TextInput
        value={newTitle}
        onChangeText={setNewTitle}
        placeholder="Title"
        style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}
      />

      <TextInput
        value={newDescription}
        onChangeText={setNewDescription}
        placeholder="Description"
        multiline
        style={{ borderWidth: 1, padding: 10, borderRadius: 10, height: 100 }}
      />

      <TouchableOpacity
        onPress={handleUpdate}
        style={{
          backgroundColor: "black",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>Update Task</Text>
      </TouchableOpacity>
    </View>
  );
}
