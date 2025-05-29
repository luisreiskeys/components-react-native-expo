import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DEFAULT_LABELS = ["Muito ruim", "Ruim", "Ok", "Bom", "Excelente"];

interface Props {
  defaultRating?: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  labels?: string[];
  compact?: boolean; // true = "5/5", false = "Excelente"
  style?: ViewStyle;
}

export default function StarRating({
  defaultRating = 0,
  onRatingChange,
  size = 40,
  labels = DEFAULT_LABELS,
  compact = false,
  style,
}: Props) {
  const [rating, setRating] = useState(defaultRating);
  const [animations] = useState(
    Array.from({ length: 5 }, () => new Animated.Value(1))
  );

  const handlePress = (index: number) => {
    setRating(index + 1);
    onRatingChange?.(index + 1);

    Animated.sequence([
      Animated.timing(animations[index], {
        toValue: 1.4,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.starsRow}>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < rating;
          return (
            <Pressable key={i} onPress={() => handlePress(i)}>
              <Animated.View style={{ transform: [{ scale: animations[i] }] }}>
                <Ionicons
                  name={filled ? "star" : "star-outline"}
                  size={size}
                  color={filled ? "#FFD700" : "#999"}
                />
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.label}>
        {compact
          ? `Nota: ${rating} / 5`
          : labels[rating - 1] ?? "Toque para avaliar"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  starsRow: {
    flexDirection: "row",
    gap: 6,
  },
  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#ccc",
  },
});
