import React from "react";
import { View, StyleSheet } from "react-native";

export default ({ children }) => {
  return <View style={styles.center}>{children}</View>;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
});
