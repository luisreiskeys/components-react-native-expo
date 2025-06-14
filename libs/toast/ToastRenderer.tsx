import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ToastMessage } from "./types";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

interface Props {
  toasts: ToastMessage[];
}

export const ToastRenderer = ({ toasts }: Props) => {
  return (
    <View style={styles.container}>
      {toasts.map((toast) => (
        <Animated.View
          key={toast.id}
          entering={FadeInDown.springify().damping(15)}
          exiting={FadeOutUp.duration(300)}
          style={[
            styles.toast,
            toast.type === "error" && styles.error,
            toast.type === "success" && styles.success,
            toast.type === "info" && styles.info,
            toast.type === "warning" && styles.warning,
          ]}
        >
          <Text style={styles.text}>{toast.message}</Text>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    zIndex: 9999,
    gap: 8,
  },
  toast: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#333",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  success: {
    backgroundColor: "#4caf50",
  },
  error: {
    backgroundColor: "#f44336",
  },
  info: {
    backgroundColor: "#2196f3",
  },
  warning: {
    backgroundColor: "#ff9800",
  },
  text: {
    color: "#fff",
    fontWeight: "500",
  },
});
