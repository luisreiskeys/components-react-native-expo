import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface Step {
  title: string;
}

interface Props {
  steps: Step[];
  current: number; // índice atual (0-based)
}

export default function ProgressStepper({ steps, current }: Props) {
  const primary = useThemeColor({}, "primary");
  const border = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");

  const CIRCLE_SIZE = 24;
  const LINE_HEIGHT = 2;

  return (
    <View style={[styles.wrapper, { paddingHorizontal: CIRCLE_SIZE / 2 }]}>
      {/* Linhas de fundo entre os círculos */}
      <View
        style={[
          styles.lineWrapper,
          {
            top: CIRCLE_SIZE / 2 - LINE_HEIGHT / 2,
            maxWidth: (SCREEN_WIDTH / steps.length) * (steps.length - 1),
            left: SCREEN_WIDTH / steps.length / 2,
          },
        ]}
      >
        {steps.map((_, i) => {
          if (i === steps.length - 1) return null;
          const isActive = i < current;
          const progress = useSharedValue(isActive ? 1 : 0);

          useEffect(() => {
            progress.value = withTiming(isActive ? 1 : 0, { duration: 300 });
          }, [current]);

          const animatedStyle = useAnimatedStyle(() => ({
            backgroundColor: interpolateColor(
              progress.value,
              [0, 1],
              [border, primary]
            ),
          }));

          return (
            <Animated.View
              key={i}
              style={[
                styles.line,
                { maxWidth: SCREEN_WIDTH / steps.length },
                animatedStyle,
              ]}
            />
          );
        })}
      </View>

      {/* Círculos e textos */}
      <View style={styles.stepRow}>
        {steps.map((step, index) => {
          const isActive = index <= current;
          const progress = useSharedValue(isActive ? 1 : 0);

          useEffect(() => {
            progress.value = withTiming(isActive ? 1 : 0, { duration: 300 });
          }, [current]);

          const animatedCircle = useAnimatedStyle(() => ({
            backgroundColor: interpolateColor(
              progress.value,
              [0, 1],
              [border, primary]
            ),
          }));

          return (
            <View style={styles.stepContainer} key={index}>
              <Animated.View style={[styles.circle, animatedCircle]}>
                <Text style={styles.circleText}>{index + 1}</Text>
              </Animated.View>
              <Text
                style={[
                  styles.label,
                  {
                    color: textColor,
                    fontWeight: current === index ? "600" : "400",
                  },
                ]}
              >
                {step.title}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    position: "relative",
  },
  lineWrapper: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 0,
  },
  line: {
    height: 2,
    flex: 1,
    borderRadius: 1,
    marginHorizontal: 4,
  },
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
  },
  stepContainer: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 4,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  circleText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  label: {
    fontSize: 11,
    textAlign: "center",
    flexWrap: "nowrap",
  },
});
