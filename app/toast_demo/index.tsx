import React from "react";
import { View, Text, Pressable } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useToast } from "@/libs/toast/useToast";

export default function ToastTestScreen() {
  const textColor = useThemeColor({}, "text");
  const { showToast } = useToast();

  const Button = ({
    title,
    onPress,
    backgroundColor,
  }: {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
  }) => (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: backgroundColor || "#444",
        borderRadius: 8,
        marginBottom: 12,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
        {title}
      </Text>
    </Pressable>
  );

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          color: textColor,
          marginBottom: 24,
        }}
      >
        Teste de Toasts
      </Text>

      <View style={{ width: "100%", gap: 12 }}>
        <Button
          title="Mostrar Sucesso"
          backgroundColor="#4caf50"
          onPress={() =>
            showToast({
              type: "success",
              message: "Operação realizada com sucesso!",
            })
          }
        />

        <Button
          title="Mostrar Erro"
          backgroundColor="#f44336"
          onPress={() =>
            showToast({
              type: "error",
              message: "Ocorreu um erro inesperado!",
            })
          }
        />

        <Button
          title="Mostrar Informação"
          backgroundColor="#2196f3"
          onPress={() =>
            showToast({
              type: "info",
              message: "Esse é um aviso informativo.",
            })
          }
        />

        <Button
          title="Mostrar Aviso"
          backgroundColor="#ff9800"
          onPress={() =>
            showToast({
              type: "warning",
              message: "Atenção! Algo requer cuidado.",
            })
          }
        />
      </View>
    </ThemedView>
  );
}
