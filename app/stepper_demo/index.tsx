import Stepper from "@/components/Stepper";
import { useState } from "react";
import { View, Text } from "react-native";

export default function StepperDemo() {
  const [value, setValue] = useState(1);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 18, marginBottom: 16 }}>
        Selecione a quantidade:
      </Text>

      <Stepper value={value} onChange={setValue} min={1} max={10} />

      <Text style={{ color: "#999", marginTop: 20 }}>Valor atual: {value}</Text>
    </View>
  );
}
