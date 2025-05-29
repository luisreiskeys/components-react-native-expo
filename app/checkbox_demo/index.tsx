import { useState } from "react";
import { Text, View } from "react-native";
import CheckBoxGroup from "@/components/CheckBoxGroup";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function CheckBoxDemo() {
  const [single, setSingle] = useState(["laranja"]);
  const [multi, setMulti] = useState(["banana"]);
  const textColor = useThemeColor({}, "text");

  return (
    <ThemedView style={{ flex: 1, padding: 24, gap: 40 }}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 10,
            color: textColor,
          }}
        >
          Seleção única (single):
        </Text>
        <CheckBoxGroup
          mode="single"
          selected={single}
          onChange={setSingle}
          items={[
            { label: "Maçã", value: "maca" },
            { label: "Laranja", value: "laranja" },
            { label: "Uva", value: "uva" },
          ]}
        />
      </View>

      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 10,
            color: textColor,
          }}
        >
          Seleção múltipla:
        </Text>
        <CheckBoxGroup
          mode="multiple"
          selected={multi}
          onChange={setMulti}
          items={[
            { label: "Banana", value: "banana" },
            { label: "Melancia", value: "melancia" },
            { label: "Pêssego", value: "pessego" },
          ]}
        />
      </View>
    </ThemedView>
  );
}
