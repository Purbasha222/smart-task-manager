// import { View, Text } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useTheme } from "@/hooks/useTheme";
// import { createSettingsStyles } from "@/assets/images/styles/settings.styles";
// import { getTasks } from "@/api/taskAPI";
// import LoadingSpinner from "./LoadingSpinner";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";

// const ProgressStats = () => {
//   const { colors } = useTheme();
//   const settingsStyles = createSettingsStyles(colors); // renamed to plural for consistency

//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await getTasks();

//         // ✅ adjust this if your backend structure is different
//         setTasks(response.data.data);
//       } catch (error) {
//         console.log("Error fetching tasks:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // ✅ SHOW LOADING SPINNER
//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   // const totalTasks = tasks.length;
//   // const completedTasks = tasks
//   //   ? tasks.filter((task) => task.isCompleted).length
//   //   : 0;
//   // const activeTasks = totalTasks - completedTasks;

//   return (
//     <LinearGradient
//       colors={colors.gradients.surface}
//       style={settingsStyles.section}
//     >
//       <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>

//       <View style={settingsStyles.statsContainer}>
//         {/* TOTAL TODOS */}
//         <LinearGradient
//           colors={colors.gradients.background}
//           style={[settingsStyles.statCard, { borderLeftColor: colors.primary }]}
//         >
//           <View style={settingsStyles.statIconContainer}>
//             <LinearGradient
//               colors={colors.gradients.primary}
//               style={settingsStyles.statIcon}
//             >
//               <Ionicons name="list" size={20} color="#fff" />
//             </LinearGradient>
//           </View>

//           <View>
//             <Text style={settingsStyles.statNumber}>{}</Text>
//             <Text style={settingsStyles.statLabel}>Total Todos</Text>
//           </View>
//         </LinearGradient>

//         {/* COMPLETED TODOS */}
//         <LinearGradient
//           colors={colors.gradients.background}
//           style={[settingsStyles.statCard, { borderLeftColor: colors.success }]}
//         >
//           <View style={settingsStyles.statIconContainer}>
//             <LinearGradient
//               colors={colors.gradients.success}
//               style={settingsStyles.statIcon}
//             >
//               <Ionicons name="checkmark-circle" size={20} color="#fff" />
//             </LinearGradient>
//           </View>

//           <View>
//             <Text style={settingsStyles.statNumber}>{}</Text>
//             <Text style={settingsStyles.statLabel}>Completed</Text>
//           </View>
//         </LinearGradient>

//         {/* ACTIVE TODOS */}

//         <LinearGradient
//           colors={colors.gradients.background}
//           style={[settingsStyles.statCard, { borderLeftColor: colors.warning }]}
//         >
//           <View style={settingsStyles.statIconContainer}>
//             <LinearGradient
//               colors={colors.gradients.warning}
//               style={settingsStyles.statIcon}
//             >
//               <Ionicons name="time" size={20} color="#fff" />
//             </LinearGradient>
//           </View>

//           <View>
//             <Text style={settingsStyles.statNumber}>{}</Text>
//             <Text style={settingsStyles.statLabel}>Active</Text>
//           </View>
//         </LinearGradient>
//       </View>
//     </LinearGradient>
//   );
// };

// export default ProgressStats;

// import { View, Text } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useTheme } from "@/hooks/useTheme";
// import { createSettingsStyles } from "@/assets/images/styles/settings.styles";
// import { getTasks } from "@/api/taskAPI";
// import LoadingSpinner from "./LoadingSpinner";
// import { LinearGradient } from "expo-linear-gradient";
// import * as Progress from "react-native-progress";
// import { createHomeStyles } from "@/assets/images/styles/home.styles";

// interface Task {
//   tasks: Task[];
// }

// const ProgressStats = ({ tasks }) => {
//   const { colors } = useTheme();
//   const homeStyles = createHomeStyles(colors);

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await getTasks();

//         // adjust if your backend structure differs
//         const fetchedTasks = response.data.data ?? response.data;

//         setTasks(fetchedTasks);
//       } catch (error) {
//         console.log("Error fetching tasks:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   // TASK STATS
//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter((task) => task.isCompleted).length;
//   const activeTasks = totalTasks - completedTasks;

//   const completionRate = totalTasks ? completedTasks / totalTasks : 0;
//   const activeRate = totalTasks ? activeTasks / totalTasks : 0;

//   return (
//     <LinearGradient
//       colors={colors.gradients.surface}
//       style={{
//         backgroundColor: "green",
//         marginHorizontal: 20,
//         marginBottom: 20,
//         borderRadius: 20,
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 4,
//         },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//         elevation: 8,
//       }}
//     >
//       {/* <Text style={homeStyles.progressText}>Progress Stats</Text> */}

//       {/* HORIZONTAL CIRCLE STATS */}
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-around",
//           padding: 20,
//         }}
//       >
//         {/* TOTAL TASKS */}
//         <View style={{ alignItems: "center" }}>
//           <Progress.Circle
//             size={75}
//             progress={1}
//             thickness={7}
//             color={colors.primary}
//             unfilledColor="#2a2a2a"
//             borderWidth={0}
//             showsText
//             animated
//             formatText={() => totalTasks.toString()}
//           />
//           <Text style={{ marginTop: 8, color: colors.text }}>Total</Text>
//         </View>

//         {/* COMPLETED TASKS */}
//         <View style={{ alignItems: "center" }}>
//           <Progress.Circle
//             size={75}
//             progress={completionRate}
//             thickness={7}
//             color={colors.success}
//             unfilledColor="#2a2a2a"
//             borderWidth={0}
//             showsText
//             animated
//             formatText={() => completedTasks.toString()}
//           />
//           <Text style={{ marginTop: 8, color: colors.text }}>Completed</Text>
//         </View>

//         {/* ACTIVE TASKS */}
//         <View style={{ alignItems: "center" }}>
//           <Progress.Circle
//             size={75}
//             progress={activeRate}
//             thickness={7}
//             color={colors.warning}
//             unfilledColor="#2a2a2a"
//             borderWidth={0}
//             showsText
//             animated
//             formatText={() => activeTasks.toString()}
//           />
//           <Text style={{ marginTop: 8, color: colors.text }}>Active</Text>
//         </View>
//       </View>
//     </LinearGradient>
//   );
// };

// export default ProgressStats;

// claude

import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";

interface Task {
  _id: string;
  title: string;
  isCompleted: boolean;
}

interface Props {
  tasks: Task[];
}

const ProgressStats = ({ tasks }: Props) => {
  const { colors } = useTheme();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks ? completedTasks / totalTasks : 0;
  const activeRate = totalTasks ? activeTasks / totalTasks : 0;

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={{
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 20,
        }}
      >
        {/* TOTAL TASKS */}
        <View style={{ alignItems: "center" }}>
          <Progress.Circle
            size={75}
            progress={1}
            thickness={15}
            color={colors.primary}
            unfilledColor="#2a2a2a"
            borderWidth={0}
            showsText
            animated
            formatText={() => totalTasks.toString()}
            textStyle={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.primary,
            }}
          />
          <Text
            style={{
              marginTop: 8,
              color: colors.text,
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Total
          </Text>
        </View>

        {/* COMPLETED TASKS */}
        <View style={{ alignItems: "center" }}>
          <Progress.Circle
            size={75}
            progress={completionRate}
            thickness={15}
            color={colors.success}
            unfilledColor="#2a2a2a"
            borderWidth={0}
            showsText
            animated
            formatText={() => completedTasks.toString()}
            textStyle={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.success,
            }}
          />
          <Text
            style={{
              marginTop: 8,
              color: colors.text,
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Completed
          </Text>
        </View>

        {/* ACTIVE TASKS */}
        <View style={{ alignItems: "center" }}>
          <Progress.Circle
            size={75}
            progress={activeRate}
            thickness={15}
            color={colors.warning}
            unfilledColor="#2a2a2a"
            borderWidth={0}
            showsText
            animated
            formatText={() => activeTasks.toString()}
            textStyle={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.warning,
            }}
          />
          <Text
            style={{
              marginTop: 8,
              color: colors.text,
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Active
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ProgressStats;
