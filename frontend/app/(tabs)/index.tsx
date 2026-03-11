import { createHomeStyles } from "@/assets/images/styles/home.styles";
import { useTheme } from "@/hooks/useTheme";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/EmptyState";
import { useCallback, useState } from "react";
import { deleteTask, getTasks, toggleTask } from "@/api/taskAPI";
import ProgressStats from "@/components/ProgressStats";
import { router, useFocusEffect } from "expo-router";

interface Task {
  _id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
}

export default function Index() {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      console.log("ulalala");
      console.log(res.data);
      setTasks(res.data.data);
    } catch (error) {
      console.log(error);
      console.log("wow");
      Alert.alert("Error", "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, []),
  );

  if (loading) return <LoadingSpinner />;

  const handleDeleteTask = async (id: string) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((task) => task._id !== id));
            Alert.alert("Success", "Todo deleted successfully");
          } catch (error) {
            Alert.alert("Error", "Failed to delete task");
          }
        },
      },
    ]);
  };

  const handleToggleTask = async (id: string, currentStatus: boolean) => {
    try {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, isCompleted: !currentStatus } : task,
        ),
      );

      await toggleTask(id);
    } catch (error: any) {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, isCompleted: currentStatus } : task,
        ),
      );
      Alert.alert("Error", "Failed to update task");
    }
  };

  const renderTaskItem = ({ item }: { item: Task }) => {
    console.log("item", item);
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTask(item._id, item.isCompleted)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={homeStyles.todoTextContainer}>
            <Text
              style={[
                homeStyles.todoText,
                item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.title}
            </Text>
            <Text style={homeStyles.subtitle}>{item.description}</Text>

            <View style={homeStyles.todoActions}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/editTask",
                    params: {
                      id: item._id,
                      title: item.title,
                      description: item.description,
                    },
                  })
                }
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteTask(item._id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <ProgressStats tasks={tasks} />

        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
        />

        <TouchableOpacity
          onPress={() => router.push("/addTask")}
          style={homeStyles.addButton}
        >
          <LinearGradient
            colors={colors.gradients.primary}
            style={{
              borderRadius: "50%",
              height: 60,
              width: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="add" size={35} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
