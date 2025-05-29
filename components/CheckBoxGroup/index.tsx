import React from "react";
import { Pressable, Text, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";

type Mode = "single" | "multiple";

interface Item {
  label: string;
  value: string;
}

interface Props {
  items: Item[];
  selected: string[]; // sempre array, mesmo no modo single
  onChange: (values: string[]) => void;
  mode?: Mode;
  style?: ViewStyle;
}

export default function CheckBoxGroup({
  items,
  selected,
  onChange,
  mode = "multiple",
  style,
}: Props) {
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const primary = useThemeColor({}, "primary");

  const toggle = (value: string) => {
    if (mode === "single") {
      onChange([value]);
    } else {
      if (selected.includes(value)) {
        onChange(selected.filter((v) => v !== value));
      } else {
        onChange([...selected, value]);
      }
    }
  };

  return (
    <View style={[styles.wrapper, style]}>
      {items.map((item) => {
        const isChecked = selected.includes(item.value);
        const scale = useSharedValue(isChecked ? 1 : 0);

        scale.value = withTiming(isChecked ? 1 : 0, { duration: 200 });

        const animatedCheckStyle = useAnimatedStyle(() => ({
          transform: [{ scale: scale.value }],
        }));

        return (
          <Pressable
            key={item.value}
            onPress={() => toggle(item.value)}
            style={[
              styles.option,
              { borderColor: isChecked ? primary : borderColor },
            ]}
          >
            <Animated.View
              style={[
                styles.checkbox,
                {
                  backgroundColor: isChecked ? primary : "transparent",
                  borderColor: isChecked ? primary : borderColor,
                },
                animatedCheckStyle,
              ]}
            />

            <Text style={[styles.label, { color: textColor }]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
  },
  label: {
    fontSize: 16,
  },
});
