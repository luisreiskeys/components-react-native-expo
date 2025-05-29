import { useState } from "react";
import { Dimensions, Text } from "react-native";
import MultiSwitch from "@/components/MultiSwitch";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function MultiSwitchDemo() {
  const [op, setOp] = useState(0);
  const [op2, setOp2] = useState(0);
  const textColor = useThemeColor({}, "text");

  const levels = ["Option 1", "Option 2"];
  const levels2 = ["Option 1", "Option 2", "Option 3", "Option 4"];

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
      }}
    >
      <Text style={{ fontSize: 20, color: textColor, fontWeight: "600" }}>
        Choose one Option
      </Text>

      <MultiSwitch options={levels} value={op} onChange={setOp} />

      <Text style={{ color: textColor, opacity: 0.7 }}>
        Selected: {levels[op]}
      </Text>
      <ThemedView
        style={{ width: "90%", height: 4, borderRadius: 8, marginVertical: 10 }}
        lightColor="#f2f2f2"
        darkColor="#1c1c1e"
      />
      <Text style={{ fontSize: 20, color: textColor, fontWeight: "600" }}>
        Choose one Option
      </Text>

      <MultiSwitch
        options={levels2}
        value={op2}
        onChange={setOp2}
        width={SCREEN_WIDTH * 0.85}
      />

      <Text style={{ color: textColor, opacity: 0.7 }}>
        Selected: {levels[op2]}
      </Text>
    </ThemedView>
  );
}
