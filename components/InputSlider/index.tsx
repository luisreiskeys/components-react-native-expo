import React, { useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, TextInput } from "react-native";
import TextInputForSlider from "./TextInput";
import { currency } from "./utils";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
// import { Container } from './styles';
Animated.addWhitelistedNativeProps({ text: true, defaultValue: true });
const AnimatedTxtInput = Animated.createAnimatedComponent(TextInput);
const WIDTH = Dimensions.get("window").width;

type InputSliderProps = {
  max: number;
  min: number;
  steps: number;
  amountInUse: number;
  currentLimitSelection: number;
};
export const MAX_WIDTH = WIDTH - 80;

export default function InputSlider({
  max,
  steps,
  amountInUse,
  currentLimitSelection,
}: InputSliderProps) {
  const maxAvailable = max - amountInUse; // available with the max limit
  const pressed = useSharedValue<boolean>(false);

  const offset = useSharedValue<number>(
    (currentLimitSelection * MAX_WIDTH) / max
  );
  useEffect(() => {
    offset.value = (currentLimitSelection * MAX_WIDTH) / max;
  }, [currentLimitSelection]);

  const current = (currentLimitSelection * MAX_WIDTH) / max;
  const railAvailableWidth = (maxAvailable * MAX_WIDTH) / max;
  const railInUseWidth = (amountInUse * MAX_WIDTH) / max;
  const semlimite = useSharedValue<boolean>(
    Math.round((max * offset.value) / MAX_WIDTH) - amountInUse <= 0
  );
  //
  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offset.value =
        Math.abs(offset.value) <= MAX_WIDTH
          ? offset.value + event.changeX <= 0
            ? 0
            : offset.value + event.changeX >= MAX_WIDTH
            ? MAX_WIDTH
            : offset.value + event.changeX
          : offset.value;

      semlimite.value =
        Math.round((max * offset.value) / MAX_WIDTH) - amountInUse <= 0;
    })
    .onFinalize(() => {
      pressed.value = false;
      const snaps = (steps * MAX_WIDTH) / max;
      const rest = offset.value % snaps;
      offset.value =
        rest >= snaps / 2
          ? withSpring(snaps * Math.ceil(offset.value / snaps))
          : withSpring(snaps * Math.floor(offset.value / snaps));
    });

  const styleLineBeforeInUse = useAnimatedStyle(() => {
    return {
      height: 8,
      marginTop: -8,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      width: offset.value <= railInUseWidth ? offset.value : railInUseWidth,
      backgroundColor: "#444",
    };
  });
  const styleLineAfterInUse = useAnimatedStyle(() => {
    return {
      height: 8,
      marginTop: -8,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      width:
        offset.value - railInUseWidth > 0 ? offset.value - railInUseWidth : 0,
      left: railInUseWidth,
      backgroundColor: "#47b169",
      borderLeftColor: "#000",
      borderLeftWidth: 2,
    };
  });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value },
      { scale: withTiming(pressed.value ? 1.2 : 1) },
      { rotate: "45deg" },
    ],
  }));

  const animatedTxtColor = useAnimatedStyle(() => ({
    color: semlimite.value ? "#555" : "#47b169",
  }));

  const animatedtxtProps = useAnimatedProps(() => {
    let val =
      Math.round((max * offset.value) / MAX_WIDTH / steps) * steps -
      amountInUse;

    let ret;
    let a = parseFloat(val.toString())
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    a = a.replace(/\./g, "+");
    a = a.replace(/,/g, ".");
    a = a.replace(/\+/g, ",");
    a = a.replace(/\-/g, "");
    if (val >= 0) {
      let sufx =
        current === offset.value ? "disponível para uso" : "ficará disponível";
      ret = `R$ ${a} ${sufx}`;
    } else {
      ret = `-R$ ${a} Sem limite para uso`;
    }
    return {
      text: ret,
      defaultValue: ret,
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <TextInputForSlider
        max={max}
        currentLimitSelection={currentLimitSelection}
        amountInUse={amountInUse}
        animatedValueOffset={offset}
        steps={steps}
      />
      <AnimatedTxtInput
        editable={false}
        style={[styles.availableLimit, animatedTxtColor]}
        animatedProps={animatedtxtProps}
      />
      {/* Slider Component begin */}
      <View style={styles.sliderContainer}>
        <View style={styles.labelsContainer}>
          <Text style={styles.label}>0</Text>
          <Text style={styles.label}>{max}</Text>
        </View>

        <View style={styles.rails}>
          <View style={[styles.limitInUseLimit, { width: railInUseWidth }]} />
          <View style={[styles.rail, { width: railAvailableWidth }]} />
        </View>
        <Animated.View style={styleLineBeforeInUse} />
        <Animated.View style={styleLineAfterInUse} />
        <View>
          <GestureDetector gesture={pan}>
            <Animated.View style={[animatedStyles, styles.knob]} />
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  availableLimit: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "600",
  },
  sliderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 50,
  },
  labelsContainer: {
    width: WIDTH - 80,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    color: "#ccc",
    fontSize: 14,
  },
  rails: {
    flexDirection: "row",
    width: WIDTH - 80,
    height: 8,
  },
  rail: {
    height: 8,
    backgroundColor: "#0f2516",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftColor: "#000",
    borderLeftWidth: 2,
  },
  limitInUseLimit: {
    height: 8,
    backgroundColor: "#222",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  knob: {
    position: "absolute",
    height: 32,
    width: 32,
    borderTopRightRadius: 32 / 2,
    borderBottomLeftRadius: 32 / 2,
    borderBottomRightRadius: 32 / 2,
    borderWidth: 2,
    backgroundColor: "#612F74",
    top: 5,
    left: -16,
  },
});
