import {
  Link,
  UnknownOutputParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useMemo, useState } from "react";
import { currency } from "@/components/InputSlider/utils";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useDerivedValue,
  SharedValue,
} from "react-native-reanimated";

type ScreenParams = UnknownOutputParams & {
  currentLimitSelection: number;
  max: number;
  amountInUse: number;
  offset: SharedValue<number>;
};

export default function ManualLimitInput() {
  const a_mTop = useSharedValue(0); // to the input
  const a_mBottom = useSharedValue(-80); // to the bottom button
  const router = useRouter();
  const params = useLocalSearchParams<ScreenParams>();
  const { currentLimitSelection, max, amountInUse } = params;
  const [val, setVal] = useState<string>("");

  const disabled = currency(currentLimitSelection) == val;
  const available = Number(val.replace(/\D/g, "")) / 100 - amountInUse;

  useEffect(() => {
    if (currentLimitSelection) {
      handleChange((currentLimitSelection * 100).toString());
      a_mTop.value = withTiming(50);
      a_mBottom.value = withTiming(20, {
        duration: 450,
        easing: Easing.ease,
      });
    }
  }, [currentLimitSelection]);

  function handleChange(value: string) {
    const decimal = Number(value.replace(/\D/g, "")) / 100;
    if (decimal > max) {
      return;
    }
    setVal(currency(decimal || 0).replace("R$\xa0", ""));
  }

  function updateUserLimit() {
    const updatedValue = Number(val.replace(/\D/g, "")) / 100;
    router.back();
    router.setParams({
      updatedValue,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link
          href={{
            pathname: "/input_slider/mainScreen",
          }}
          style={styles.close}
        >
          <Ionicons size={28} name={"chevron-back"} color={"#fff"} />
        </Link>
        <Text style={styles.title}>Meus limites</Text>
      </View>
      <View style={styles.content}>
        <Animated.View style={[styles.inputContainer, { top: a_mTop }]}>
          <TextInput
            style={styles.textInput}
            value={val}
            onChangeText={handleChange}
            keyboardType="numeric"
            autoFocus={true}
            selectionColor={"#612F74"}
          />
          <Text
            style={[
              styles.availableLimit,
              { color: available > 0 ? "#47b169" : "#555" },
            ]}
          >
            {currency(available)}{" "}
            {available == currentLimitSelection - amountInUse
              ? "disponível para uso"
              : available > 0
              ? "ficará disponível"
              : "Sem limite para uso"}
          </Text>
        </Animated.View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Animated.View style={{ marginBottom: a_mBottom }}>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => updateUserLimit()}
            style={[
              styles.button,
              { backgroundColor: disabled ? "#222" : "#612F74" },
            ]}
          >
            <Text
              style={[styles.buttonText, { color: disabled ? "#555" : "#fff" }]}
            >
              Ajustar limite
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    left: 12,
    position: "absolute",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  textInput: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    borderBottomColor: "#222",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  availableLimit: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "600",
  },
  button: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
