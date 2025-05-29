import { useState } from "react";
import { View, Button, Text } from "react-native";
import BottomSheet from "../../components/BottomSheet";

export default function BottomSheetDemo() {
  const [visible, setVisible] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Abrir Bottom Sheet" onPress={() => setVisible(true)} />

      <BottomSheet visible={visible} onClose={() => setVisible(false)}>
        <Text style={{ color: "#fff", fontSize: 18, marginBottom: 10 }}>
          Ações rápidas:
        </Text>
        <Text style={{ color: "#fff", marginBottom: 8 }}>📤 Compartilhar</Text>
        <Text style={{ color: "#fff", marginBottom: 8 }}>✏️ Editar</Text>
        <Text style={{ color: "#fff" }}>🗑️ Excluir</Text>
      </BottomSheet>
    </View>
  );
}
