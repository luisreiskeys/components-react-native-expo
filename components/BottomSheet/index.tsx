import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface Props {
  visible: boolean;
  onClose: () => void;
  height?: number;
  children: React.ReactNode;
}

export default function BottomSheet({
  visible,
  onClose,
  height = SCREEN_HEIGHT * 0.4,
  children,
}: Props) {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: withTiming(visible ? 1 : 0, { duration: 300 }),
  }));

  const open = () => {
    translateY.value = withTiming(height, { duration: 300 });
  };

  const close = () => {
    translateY.value = withTiming(
      SCREEN_HEIGHT,
      { duration: 200 },
      (finished) => {
        if (finished) runOnJS(onClose)();
      }
    );
  };

  useEffect(() => {
    if (visible) open();
    else close();
  }, [visible]);

  return (
    <>
      {visible && (
        <>
          <TouchableWithoutFeedback onPress={close}>
            <Animated.View style={[styles.backdrop, backdropStyle]} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.sheet,
              {
                height: 400,
                backgroundColor: isDark ? "#1c1c1e" : "#f2f2f2",
              },
              animatedStyle,
            ]}
          >
            {children}
          </Animated.View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    zIndex: 9,
  },
  sheet: {
    position: "absolute",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 10,
    padding: 20,
  },
});
