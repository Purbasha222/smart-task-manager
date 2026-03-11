import { View, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default Logout;
