import { Image, StyleSheet, Platform, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView, {
  HEADER_HEIGHT,
} from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ExternalLink } from "@/components/ExternalLink";
import { useEffect, useRef } from "react";
import { useDynamicNotification } from "@/libs/dynamic-notification/useDynamicNotification";

export default function HomeScreen() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { checkNotification } = useDynamicNotification();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/perfilapp.jpg")}
          style={styles.profileImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">About me</ThemedText>
        <ThemedText>
          I'm started developing when was 17 focused in microcontrollers and
          CLPs, since then i have worked with a big variety of programming
          languages. i currently run a company that make Mobile app and web
          softwares. I also run a Youtube channel where i teach mainly
          react-native.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">About this Monorepo</ThemedText>
        <ThemedText>
          On this repo I'll share React Native componnents in some context to
          show the expected usage.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Follow me</ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">GitHub</ThemedText>
        </ExternalLink>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Linkedin</ThemedText>
        </ExternalLink>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Youtube</ThemedText>
        </ExternalLink>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  profileImage: {
    height: HEADER_HEIGHT,
    width: "100%",
    bottom: 0,
    top: 0,
    left: 0,
    position: "absolute",
  },
});
