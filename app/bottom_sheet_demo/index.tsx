import { useState } from "react";
import { Text } from "react-native";
import BottomSheet from "../../components/BottomSheet";
import { ThemedView } from "../../components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function BottomSheetDemo() {
  const [visible, setVisible] = useState(false);
  const textColor = useThemeColor({}, "text");

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text
        onPress={() => setVisible(true)}
        style={{ fontSize: 18, color: textColor, marginBottom: 20 }}
      >
        Abrir Bottom Sheet
      </Text>

      <BottomSheet visible={visible} onClose={() => setVisible(false)}>
        <Text style={{ color: textColor, fontSize: 18, marginBottom: 10 }}>
          Ações rápidas:
        </Text>
        <Text style={{ color: textColor, marginBottom: 8 }}>
          📤 Compartilhar
        </Text>
        <Text style={{ color: textColor, marginBottom: 8 }}>✏️ Editar</Text>
        <Text style={{ color: textColor }}>🗑️ Excluir</Text>
      </BottomSheet>
    </ThemedView>
  );
}
