import React, { useEffect } from "react";
import { DimensionValue, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolate,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
  width?: number | DimensionValue;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export default function Skeleton({
  width = "100%",
  height = 20,
  borderRadius = 8,
  style,
}: Props) {
  const baseColor = useThemeColor({}, "card");

  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 600 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shimmer.value, [0, 1], [0.5, 1]);
    return {
      opacity,
    };
  });
  return (
    <Animated.View
      style={[
        {
          backgroundColor: baseColor,
          width,
          height,
          borderRadius,
        },
        animatedStyle,
        style,
      ]}
    />
  );
}
