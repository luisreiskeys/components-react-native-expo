import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import Animated, {
  SharedValue,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { MAX_WIDTH } from ".";
Animated.addWhitelistedNativeProps({ text: true, defaultValue: true });
const AnimatedTxtInput = Animated.createAnimatedComponent(TextInput);
// import { Container } from './styles';

type TextInputComponent = {
  max: number;
  currentLimitSelection: number;
  amountInUse: number;
  steps: number;
  animatedValueOffset: SharedValue<number>;
  toRound: SharedValue<boolean>;
};

export default function TextInputForSlider({
  max,
  currentLimitSelection,
  amountInUse,
  animatedValueOffset,
  steps,
  toRound,
}: TextInputComponent) {
  const router = useRouter();

  const offset = useDerivedValue(() => {
    const formatedValue = Math.abs(animatedValueOffset.value);
    return formatedValue;
  });
  const isToRound = useDerivedValue(() => {
    const formatedValue = toRound.value;
    return formatedValue;
  });

  const animatedtxtProps = useAnimatedProps(() => {
    let val;
    if (isToRound.value) {
      val = Math.round((max * offset.value) / MAX_WIDTH / steps) * steps;
    } else {
      val = (max * offset.value) / MAX_WIDTH;
    }
    let ret;
    let a = parseFloat(val.toString())
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    a = a.replace(/\./g, "+");
    a = a.replace(/,/g, ".");
    a = a.replace(/\+/g, ",");
    a = a.replace(/\-/g, "");

    ret = `R$ ${a}`;
    return {
      text: ret,
      defaultValue: ret,
    };
  });

  function goToManualScreen() {
    let val;
    if (isToRound.value) {
      val = Math.round((max * offset.value) / MAX_WIDTH / steps) * steps;
    } else {
      val = (max * offset.value) / MAX_WIDTH;
    }

    router.push({
      pathname: "/input_slider/manualInput",
      params: { currentLimitSelection: val, max, amountInUse },
    });
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => goToManualScreen()}>
      <View style={styles.touchable}>
        <AnimatedTxtInput
          editable={false}
          style={[styles.text]}
          animatedProps={animatedtxtProps}
        />
        <View style={styles.overlay} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderBottomColor: "#222",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },
  overlay: {
    width: "110%",
    height: 40,
    position: "absolute",
  },
});
