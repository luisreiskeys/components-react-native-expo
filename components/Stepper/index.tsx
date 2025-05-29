import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";

interface Props {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  style?: ViewStyle;
}

export default function Stepper({
  value,
  onChange,
  min = 0,
  max = 99,
  style,
}: Props) {
  const bg = useThemeColor({}, "card"); // fundo dos botões
  const text = useThemeColor({}, "text");

  const animatedValue = useSharedValue(value);

  React.useEffect(() => {
    animatedValue.value = withSpring(value, { duration: 100 });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + (animatedValue.value % 1 !== 0 ? 0.1 : 0) }],
  }));

  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <ThemedView
      style={[styles.wrapper, style]}
      lightColor="#f2f2f2"
      darkColor="#1c1c1e"
    >
      <Pressable
        style={[styles.button, { backgroundColor: bg }]}
        onPress={decrease}
      >
        <Text style={[styles.sign, { color: text }]}>−</Text>
      </Pressable>

      <Animated.Text style={[styles.value, { color: text }, animatedStyle]}>
        {value}
      </Animated.Text>

      <Pressable
        style={[styles.button, { backgroundColor: bg }]}
        onPress={increase}
      >
        <Text style={[styles.sign, { color: text }]}>+</Text>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 6,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },
  sign: {
    fontSize: 24,
    fontWeight: "600",
  },
  value: {
    fontSize: 20,
    fontWeight: "500",
    minWidth: 40,
    textAlign: "center",
  },
});
