import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
  options: string[];
  value: number; // índice da opção selecionada
  onChange: (index: number) => void;
  width?: number;
}

export default function MultiSwitch({
  options,
  value,
  onChange,
  width = 240,
}: Props) {
  const count = options.length;
  const optionWidth = width / count;

  const primary = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");
  const bg = useThemeColor({}, "card");

  const translateX = useSharedValue(value * optionWidth);

  React.useEffect(() => {
    translateX.value = withTiming(value * optionWidth, { duration: 200 });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          width,
          backgroundColor: bg,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          { width: optionWidth, backgroundColor: primary },
          animatedStyle,
        ]}
      />
      {options.map((label, index) => (
        <Pressable
          key={index}
          style={[styles.option, { width: optionWidth }]}
          onPress={() => onChange(index)}
        >
          <Text
            style={{
              color: value === index ? "#fff" : textColor,
              fontWeight: value === index ? "600" : "400",
            }}
          >
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 20,
    flexDirection: "row",
    position: "relative",
    overflow: "hidden",
  },
  option: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  thumb: {
    position: "absolute",
    top: 0,
    bottom: 0,
    borderRadius: 20,
    zIndex: 0,
  },
});
