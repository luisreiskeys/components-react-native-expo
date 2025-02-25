import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Components</ThemedText>
      </ThemedView>
      <ThemedText>
        I'll try to upload a least one new component per week. Stay tuned.
      </ThemedText>
      <Collapsible title="Input Slider (Nubank App)">
        <ThemedText>
          This is a Input Slider component based on a bank app (Nubank). On the
          bank app this component is used to adjust the credit card limit.
        </ThemedText>
        <Link
          href={{
            pathname: "/input_slider/mainScreen",
            params: { name: "Bacon" },
          }}
        >
          <ThemedText type="link">View component</ThemedText>
        </Link>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
