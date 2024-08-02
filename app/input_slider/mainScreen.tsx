import {
  Link,
  Stack,
  UnknownOutputParams,
  useLocalSearchParams,
} from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { SafeAreaView } from "react-native-safe-area-context";
import InputSlider from "@/components/InputSlider";

type ScreenParams = UnknownOutputParams & {
  updatedValue: number;
};

export default function MainScreen() {
  const params = useLocalSearchParams<ScreenParams>();
  const { updatedValue } = params;
  // The following variables are hard coded to demonstrate the component, be shure to do the correct implementatio to your project
  const min = 0; // min value to be used by InputSlider component
  const max = 15000; // max value to be used by InputSlider component
  const steps = 500; // incremental steps to be used by InputSlider component
  const amountInUse = 8453.79; // current amount in use of the credit limit
  const currentLimitSelection = updatedValue ?? 10500; // the choice of user for limit value
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link href="/components" style={styles.close}>
          <Ionicons size={28} name={"close"} color={"#fff"} />
        </Link>
        <Text style={styles.title}>Meus limites</Text>
      </View>
      <InputSlider
        max={max}
        min={min}
        amountInUse={amountInUse}
        steps={steps}
        currentLimitSelection={currentLimitSelection}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
});
