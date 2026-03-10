// import { AuthContext, AuthProvider } from "../context/AuthContext";
// import { ThemeProvider } from "@/hooks/useTheme";
// import { Stack } from "expo-router";
// import { useContext } from "react";

// const RootNavigator = () => {
//   const { isAuthenticated } = useContext(AuthContext);
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Protected guard={isAuthenticated}>
//         <Stack.Screen name="(tabs)" />
//       </Stack.Protected>
//       <Stack.Protected guard={!isAuthenticated}>
//         <Stack.Screen name="(auth)" />
//       </Stack.Protected>
//     </Stack>
//   );
// };

// export default function RootLayout() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <RootNavigator />
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// import { AuthContext, AuthProvider } from "../context/AuthContext";
// import { ThemeProvider } from "@/hooks/useTheme";
// import { Stack } from "expo-router";
// import { useContext } from "react";

// const RootNavigator = () => {
//   const auth = useContext(AuthContext);

//   // safety check (helps TypeScript and prevents crashes)
//   if (!auth) {
//     return null;
//   }

//   const { isAuthenticated } = auth;

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Protected guard={isAuthenticated}>
//         <Stack.Screen name="(tabs)" />
//       </Stack.Protected>

//       <Stack.Protected guard={!isAuthenticated}>
//         <Stack.Screen name="(auth)" />
//       </Stack.Protected>
//     </Stack>
//   );
// };

// export default function RootLayout() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <RootNavigator />
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

import { AuthContext, AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { useContext } from "react";

const RootNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
