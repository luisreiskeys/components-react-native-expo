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
        <ThemedText type="title">Components </ThemedText>
      </ThemedView>
      <ThemedText>
        I'll try to upload a least one new component per week. Stay tuned. By
        Luís Reis Dev.
      </ThemedText>
      <Collapsible title="Input Slider (Nubank App)">
        <ThemedText>
          This is a Input Slider component based on a bank app (Nubank). On the
          bank app this component is used to adjust the credit card limit.
        </ThemedText>
        <Link
          href={{
            pathname: "/input_slider/mainScreen",
          }}
        >
          <ThemedText type="link">View component</ThemedText>
        </Link>
      </Collapsible>
      <Collapsible title="StartRating">
        <ThemedText>This is a Start Rating component.</ThemedText>
        <Link
          href={{
            pathname: "/star_rating_demo",
          }}
        >
          <ThemedText type="link">View component</ThemedText>
        </Link>
      </Collapsible>
      <Collapsible title="BottomSheet">
        <ThemedText>This is a Bottom Sheet component.</ThemedText>
        <Link
          href={{
            pathname: "/bottom_sheet_demo",
          }}
        >
          <ThemedText type="link">View component</ThemedText>
        </Link>
      </Collapsible>
      <Collapsible title="Stepper">
        <ThemedText>This is a Stepper component.</ThemedText>
        <Link
          href={{
            pathname: "/stepper_demo",
          }}
        >
          <ThemedText type="link">View component</ThemedText>
        </Link>
      </Collapsible>
      <Collapsible title="Skeleton">
        <ThemedText>This is a Skeleton component.</ThemedText>
        <Link
          href={{
            pathname: "/skeleton_demo",
          }}
        >
          <ThemedText type="link">View component</ThemedText>
        </Link>
      </Collapsible>
      <Collapsible title="CheckBox">
        <ThemedText>This is a CheckBox component.</ThemedText>
        <Link
          href={{
            pathname: "/checkbox_demo",
          }}
        >
          <ThemedText type="link">View component</ThemedText>
        </Link>
      </Collapsible>
      <Collapsible title="MultiSwitch">
        <ThemedText>This is a MultiSwitch component.</ThemedText>
        <Link
          href={{
            pathname: "/multiswitch_demo",
          }}
        >
          <ThemedText type="link">View component</ThemedText>
        </Link>
      </Collapsible>
      <Collapsible title="Progress Steper">
        <ThemedText>This is a Progress Steper component.</ThemedText>
        <Link
          href={{
            pathname: "/progress_stepper_demo",
          }}
        >
          <ThemedText type="link">View component</ThemedText>
        </Link>
      </Collapsible>
      <Collapsible title="Infinite Carousel">
        <ThemedText>This is a Infinite Carousel component.</ThemedText>
        <Link
          href={{
            pathname: "/infinite_carousel_demo",
          }}
        >
          <ThemedText type="link">View component</ThemedText>
        </Link>
      </Collapsible>
      <Collapsible title="Toast">
        <ThemedText>This is a Toast component.</ThemedText>
        <Link
          href={{
            pathname: "/toast_demo",
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
